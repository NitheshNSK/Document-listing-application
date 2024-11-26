import React, { useState, useEffect, Children } from "react";
import {
  getDocuments,
  deleteDocument,
  getDocumentsByName,
  createDocument,
} from "../services/Services";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  TablePagination,
  IconButton,
  TableSortLabel,
  CircularProgress,
  Box,
  Modal,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [searched, setSearched] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null); // To store the selected document
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [openAddDocModal, setOpenAddDocModal] = useState(false);
  const [newDoc, setNewDoc] = useState({ name: "", content: "" });
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    fetchDocuments();
  }, [page, sortConfig]);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const data = await getDocuments(search);

      // Apply sorting after fetching the data
      const sortedData = sortDocuments(data);
      setDocuments(sortedData);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
    setLoading(false);
  };

  const sortDocuments = (data) => {
    const { key, direction } = sortConfig;
    return [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteDocument(id);
      fetchDocuments();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setPage(0); // Reset to the first page when searching
      setSearched(true);
      let data = await getDocumentsByName(search);
      setDocuments(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.direction === "asc" ? "desc" : "asc",
    }));
  };
  // Handle opening the Add Document Modal
  const handleOpenAddDocModal = () => {
    setOpenAddDocModal(true);
  };

  // Handle closing the Add Document Modal
  const handleCloseAddDocModal = () => {
    setOpenAddDocModal(false);
    setNewDoc({ name: "", content: "" }); // Reset form after close
  };

  // Handle adding a new document
  const handleAddDocument = async () => {
    if(newDoc.name==""||newDoc.content==""){
       setOpen(true);
        return false; 
    }
    await createDocument(newDoc);
    fetchDocuments(); // Refresh document list
    handleCloseAddDocModal(); // Close the modal
  };
  // Handle opening modal with document content
  const handleOpenModal = (doc) => {
    setSelectedDoc(doc); // Set selected document to show in modal
  };

  // Handle closing modal
  const handleCloseModal = () => {
    setSelectedDoc(null);
  };
 const handleClose = (event, reason) => {
   if (reason === "clickaway") {
     return;
   }

   setOpen(false);
 };
  return (
    <div style={{ padding: "20px" }}>
      <h2>Document List</h2>
      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <TextField
              label="Search by name"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ marginRight: "10px" }}
            />
            <Button type="submit" variant="contained" color="primary">
              Search
            </Button>
            {searched && (
              <Button
                onClick={() => {
                  setSortConfig({ key: "name", direction: "asc" });
                  setSearched(false);
                  setSearch("");
                }}
                type="submit"
                variant="contained"
                color="error"
              >
                Clear Search
              </Button>
            )}{" "}
          </Box>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleOpenAddDocModal}
            >
              Add Document
            </Button>
          </Box>
        </div>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
            <b>File Name and Content are required</b>
          </Alert>
        </Snackbar>
      </form>

      {loading ? (
        <div
          style={{
            height: "20vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="success" />
        </div>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={sortConfig.key === "name"}
                      direction={
                        sortConfig.key === "name" ? sortConfig.direction : "asc"
                      }
                      onClick={() => handleSort("name")}
                    >
                      <b>Name</b>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortConfig.key === "created_at"}
                      direction={
                        sortConfig.key === "created_at"
                          ? sortConfig.direction
                          : "asc"
                      }
                      onClick={() => handleSort("created_at")}
                    >
                      <b>Created Date</b>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <b>Size (bytes)</b>
                  </TableCell>
                  <TableCell>
                    <b>View Content</b>
                  </TableCell>
                  <TableCell>
                    <b>Actions</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              {documents.length !== 0 ? (
                <>
                  <TableBody>
                    {documents
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      ?.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell>{doc.name}</TableCell>
                          <TableCell>
                            {new Date(doc.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{doc.size}</TableCell>
                          <TableCell>
                            <Button onClick={() => handleOpenModal(doc)}>
                              View
                            </Button>
                          </TableCell>
                          <TableCell>
                            <IconButton
                              color="secondary"
                              onClick={() => handleDelete(doc.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </>
              ) : (
                <>
                <h1 >No Records Found</h1></>
              )}
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={documents.length} // Total number of documents
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[]}
          />
        </>
      )}
      <Modal
        open={selectedDoc !== null}
        onClose={handleCloseModal}
        aria-labelledby="document-modal-title"
        aria-describedby="document-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "4px",
            boxShadow: 24,
            width: "80%",
            maxWidth: "600px",
            maxHeight: "80%",
            overflowY: "auto",
          }}
        >
          <Typography id="document-modal-title" variant="h6" component="h2">
            Document Content
          </Typography>
          <Typography
            id="document-modal-description"
            sx={{ marginTop: "10px" }}
          >
            {selectedDoc?.content}
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={openAddDocModal}
        onClose={handleCloseAddDocModal}
        aria-labelledby="add-document-modal-title"
        aria-describedby="add-document-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "4px",
            boxShadow: 24,
            width: "80%",
            maxWidth: "600px",
            maxHeight: "80%",
            overflowY: "auto",
          }}
        >
          <Typography id="add-document-modal-title" variant="h6" component="h2">
            Add New Document
          </Typography>
          <TextField
            label="Document Name"
            variant="outlined"
            fullWidth
            required={true}
            sx={{ marginTop: "10px" }}
            value={newDoc.name}
            onChange={(e) => setNewDoc({ ...newDoc, name: e.target.value })}
          />
          <TextField
            label="Document Content"
            variant="outlined"
            fullWidth
            multiline
            required={true}
            rows={4}
            sx={{ marginTop: "10px" }}
            value={newDoc.content}
            onChange={(e) => setNewDoc({ ...newDoc, content: e.target.value })}
          />
          <Box sx={{ marginTop: "20px", textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddDocument}
              sx={{ marginRight: "10px" }}
            >
              Add Document
            </Button>
            <Button variant="outlined" onClick={handleCloseAddDocModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default DocumentList;
