import { Box, Button, CircularProgress, Container, Divider, Grid, Modal, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { getUserRole, getMedias as apiGetMedias, getUsers as apiGetUsers, getUserReviews, postFile, postGenre } from '../api';
import OptionList from '../components/OptionList'
import DataTable from '../components/DataTable';
import DataField from '../components/DataField';
import UsersModal from '../components/UsersModal';
import UserCreateModal from '../components/UserCreateModal';
import MediasModal from '../components/MediasModal';
import MediaCreateModal from '../components/MediaCreateModal';
import UploadModal from '../components/UploadModal';

function StatsDashboard() {

  return (
    <Typography>Stats</Typography>
  );
}

function UserDashboard(props) {

  const [userData, setUserData] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [modalData, setModalData] = useState(null);

  const headers = [
    { id: 'email', label: 'Email' },
    { id: 'name', label: 'Name' },
    { id: 'family_name', label: 'Family Name' },
    { id: 'subscription_status', label: 'Status' },
    { id: 'role', label: 'Role' },
  ]

  const handleCreateClick = () => {
    setOpenCreate(true);
  }

  const handleRowClick = (data) => {
    setModalData(data);
    setOpenDetails(true);
  }

  const refreshData = async () => {
    const res = await apiGetUsers();
    const users = res.data;
    setUserData(users); 
  }

  const handleDetailsClose = () => {
    setModalData(null);
    setOpenDetails(false);
    refreshData();
  }

  const handleCreateClose = () => {
    setOpenCreate(false);
    refreshData();
  }

  // const rowActions = [
  //   { label: 'Edit', action: editUser },
  //   { label: 'Details', action: getUserDetails },
  //   { label: 'Delete', action: deleteUser },
  // ]

  useEffect( () => {
    const getUsers = async () => {
      const res = await apiGetUsers();
      const users = res.data;
      setUserData(users);
    }
    
    getUsers();
  }, [])

  return (
    <>
      <DataTable title={'Users'} headers={headers} data={userData} createClick={handleCreateClick} rowClick={handleRowClick} role={props.role} />
      <Modal open={openDetails} onClose={handleDetailsClose} >
        <Box>
          <UsersModal data={modalData} onClose={handleDetailsClose} role={props.role} />
        </Box>
      </Modal>
      <Modal open={openCreate} onClose={handleCreateClose} >
        <Box>
          <UserCreateModal onClose={handleCreateClose} />
        </Box>
      </Modal>
    </>
  );
}

function MediasDashboard() {

  const [mediaData, setMediaData] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [modalData, setModalData] = useState(null);
  
  const [openAddGenre, setOpenAddGenre] = useState(false);
  const [genreName, setGenreName] = useState('');

  const [openAddPoster, setOpenAddPoster] = useState(false);
  const [posterId, setPosterId] = useState('');
  const [posterType, setPosterType] = useState('Movie');
  const [posterFile, setPosterFile] = useState();

  const [openAddSource, setOpenAddSource] = useState(false);
  const [sourceId, setSourceId] = useState('');
  const [sourceFile, setSourceFile] = useState();

  const headers = [
    { id: 'title', label: 'Title' },
    { id: 'type', label: 'Type' },
    { id: 'production', label: 'Production' },
  ]

  const handleCreateClick = () => {
    setOpenCreate(true);
  }

  const handleRowClick = (data) => {
    setModalData(data);
    setOpenDetails(true);
  }

  const refreshData = async () => {
    const res = await apiGetMedias();
    const medias = res.data;
    setMediaData(medias);
  }

  const handleDetailsClose = () => {
    setModalData(null);
    setOpenDetails(false);
    refreshData();
  }

  const handleCreateClose = () => {
    setOpenCreate(false);
    refreshData();
  }

  const handleUploadGenre = async () => {
    postGenre(genreName);
    handleAddGenreClose();
  }

  const handleUploadPoster = async () => {
    const posterData = new FormData();
    posterData.append('file', posterFile);
    posterData.append('fileName', `${posterId}.jpg`);
    posterData.append('path', `/images/${posterType.toLowerCase()}_posters/`);
    await postFile(posterData);
    handleAddPosterClose();
  }
  
  const handleUploadSource = async () => {
    const sourceData = new FormData();
    sourceData.append('file', sourceFile);
    sourceData.append('fileName', `${sourceId}.mp4`);
    sourceData.append('path', `/media/`);
    await postFile(sourceData);
    handleAddSourceClose();
  }

  const handleAddGenreClose = () => {
    setOpenAddGenre(false);
    setGenreName('');
  }

  const handleAddPosterClose = () => {
    setOpenAddPoster(false);
    setPosterId('');
    setPosterType('Movie');
    setPosterFile();
  }

  const handleAddSourceClose = () => {
    setOpenAddSource(false);
    setSourceId('');
    setSourceFile();
  }

  useEffect( () => {
    const getMedias = async () => {
      const res = await apiGetMedias();
      const medias = res.data;
      setMediaData(medias);
    }

    getMedias();
  }, [])

  return (
    <>
      <DataTable title='Medias' headers={headers} data={mediaData} createClick={handleCreateClick} rowClick={handleRowClick} role={'admin'} />

      <Box sx={{ marginTop: 2 }}>
        <Button color='secondary' variant='contained' sx={{ width: '128px', mr: 2 }} onClick={() => setOpenAddGenre(true)} >Add genre</Button>
        <Button color='secondary' variant='contained' sx={{ width: '128px', mr: 2 }} onClick={() => setOpenAddPoster(true)} >Add poster</Button>
        <Button color='secondary' variant='contained' sx={{ width: '128px', }} onClick={() => setOpenAddSource(true)} >Add source</Button>
      </Box>

      <Modal open={openDetails} onClose={handleDetailsClose} >
        <Box>
          <MediasModal data={modalData} onClose={handleDetailsClose} />
        </Box>
      </Modal>
      <Modal open={openCreate} onClose={handleCreateClose} >
        <Box>
          <MediaCreateModal onClose={handleCreateClose} />
        </Box>
      </Modal>
      <Modal open={openAddGenre} onClose={handleAddGenreClose} >
        <Box>
          <UploadModal type='Genre' onUpload={handleUploadGenre} onClose={handleAddGenreClose} >
            <DataField type='text' label='Genre name' isEditing={true} onChange={(event) => setGenreName(event.target.value)} />
          </UploadModal>
        </Box>
      </Modal>
      <Modal open={openAddPoster} onClose={handleAddPosterClose} >
        <Box>
          <UploadModal type='Poster' onUpload={handleUploadPoster} onClose={handleAddPosterClose} >
            <DataField name='media_id' type='text' label='Id' isEditing={true} onChange={(event) => setPosterId(event.target.value)}/>
            <DataField name='type' type='select' selectValues={['Movie', 'Show']} defaultValue='Movie' label='Type' isEditing={true} onChange={(event) => setPosterType(event.target.value)}/>
            <DataField type='custom' label='Poster'>
              <input type='file' onChange={(event) => setPosterFile(event.target.files[0])} />
            </DataField>
          </UploadModal>
        </Box>
      </Modal>
      <Modal open={openAddSource} onClose={handleAddSourceClose} >
        <Box>
          <UploadModal type='Source' onUpload={handleUploadSource} onClose={handleAddSourceClose} >
            <DataField name='media_id' type='text' label='Id' isEditing={true} onChange={(event) => setSourceId(event.target.value)} />
            <DataField type='custom' label='Source'>
              <input type='file' onChange={(event) => setSourceFile(event.target.files[0])} />
            </DataField>
          </UploadModal>
        </Box>
      </Modal>
    </>
  );
}

function SystemDashboard() {

  return (
    <Typography>System</Typography>
  );
}

export default function Dashboard() {


  const displayStats = () => {
    setDisplayedData('Stats');
    setLoading(false);
  };

  const displayUsers = () => {
    setDisplayedData('Users');
    setLoading(false);
  };

  const displayMedias = () => {
    setDisplayedData('Medias');
    setLoading(false);
  };

  const displaySystem = () => {
    setDisplayedData('System');
    setLoading(false);
  };  

  const optionList = [
    { text: 'Stats', onClick: displayStats },
    { text: 'Users', onClick: displayUsers },
    { text: 'Medias', onClick: displayMedias },
  ];

  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState(optionList);
  const [displayedData, setDisplayedData] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fecthUserRole = async () => {
      const res = await getUserRole();
      console.log('fetched role:', res.data);
      setUserRole(res.data);
      if (res.data === 'admin') setOptions([...optionList, { text: 'System', onClick: displaySystem }]);
    }

    fecthUserRole();
  }, []);

  const renderContent = (content) => {
    switch(content) {
      case 'Stats':
        return <StatsDashboard />;
      case 'Users':
        return <UserDashboard role={userRole} />
      case 'Medias':
        return <MediasDashboard />
      case 'System':
        return <SystemDashboard />
      default:
        return <></>
    }
  }

  return (
    <Container sx={{ minHeight: '750px' }}>
      <Paper sx={{ maxWidth: 'xl', p: 4, m: 'auto', mt: 4, backgroundColor: 'primary.main', height: '100%', maxHeight: '750px'}}>
        <Box sx={{ mb: 1}}>
          <Typography color='secondary.dark' variant='h4'>
            Dashboard
          </Typography>
        </Box>
        <Divider variant='middle' />
        <Box sx={{ display: 'flex', flexGrow: 1, p: 3 }}>
          <OptionList options={options} />
          <Divider orientation='vertical' variant='middle' flexItem />
          <Box sx={{ flexGrow: 1, p: 3}}>
            { loading ?
              <Box width='100%' mt={15} display='flex' justifyContent={'center'} alignItems={'center'} >
                <CircularProgress color="accent" />
              </Box>
              : renderContent(displayedData) }
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}
