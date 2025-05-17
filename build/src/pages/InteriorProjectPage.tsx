import React from 'react';
import { Box, Typography, Grid, Paper, Button, Tabs, Tab, TextField, Chip } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

import { useGetProjectByIdQuery, useUpdateProjectMutation } from '../services/interiorDesignerApi';
import InteriorItemsList from '../components/interiorDesigner/InteriorItemsList';
import ProductCatalog from '../components/interiorDesigner/ProductCatalog';
import RoomScene from '../components/interiorDesigner/RoomScene';
import ProjectControls from '../components/interiorDesigner/ProjectControls';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`designer-tabpanel-${index}`}
      aria-labelledby={`designer-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const InteriorProjectPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [tabValue, setTabValue] = React.useState(0);
  const [isEditing, setIsEditing] = React.useState(false);
  const [projectName, setProjectName] = React.useState('');
  
  const { data: project, isLoading, error } = useGetProjectByIdQuery(Number(projectId));
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  
  React.useEffect(() => {
    if (project) {
      setProjectName(project.name);
    }
  }, [project]);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const handleEditToggle = () => {
    if (isEditing && project) {
      // Save changes
      updateProject({
        projectId: project.id,
        projectData: {
          name: projectName
        }
      });
    }
    setIsEditing(!isEditing);
  };
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (error || !project) {
    return <ErrorMessage message="Произошла ошибка при загрузке проекта. Пожалуйста, попробуйте позже." />;
  }
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        {isEditing ? (
          <TextField
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            variant="standard"
            sx={{ 
              fontSize: '2rem',
              fontFamily: '"Playfair Display", serif',
              '& .MuiInputBase-input': {
                fontSize: '2rem',
                fontFamily: '"Playfair Display", serif',
              }
            }}
          />
        ) : (
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontFamily: '"Playfair Display", serif',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: 0,
                width: 80,
                height: 3,
                backgroundColor: 'primary.main',
              }
            }}
          >
            {project.name}
          </Typography>
        )}
        
        <Button 
          variant={isEditing ? "contained" : "outlined"} 
          color="primary"
          onClick={handleEditToggle}
          disabled={isUpdating}
        >
          {isEditing ? "Сохранить" : "Редактировать"}
        </Button>
      </Box>
      
      <Box sx={{ mb: 2 }}>
        <Chip label={`Стиль: ${project.style || 'Не указан'}`} sx={{ mr: 1 }} />
        <Chip label={`Тип помещения: ${project.layout_type || 'Не указан'}`} sx={{ mr: 1 }} />
        <Chip label={`Размеры: ${project.dimensions || 'Не указаны'}`} />
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper 
            variant="outlined" 
            sx={{ 
              height: 500, 
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 2, 5]} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <RoomScene project={project} isEditing={isEditing} />
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            </Canvas>
            
            <ProjectControls isEditing={isEditing} />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ height: '100%' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="designer tabs"
              variant="fullWidth"
            >
              <Tab label="Элементы проекта" id="designer-tab-0" />
              <Tab label="Каталог мебели" id="designer-tab-1" />
            </Tabs>
            
            <TabPanel value={tabValue} index={0}>
              <InteriorItemsList 
                items={project.items} 
                projectId={project.id} 
                isEditing={isEditing} 
              />
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              <ProductCatalog projectId={project.id} isEditing={isEditing} />
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Описание проекта
        </Typography>
        
        {isEditing ? (
          <TextField
            fullWidth
            multiline
            rows={4}
            value={project.description || ''}
            placeholder="Добавьте описание проекта..."
            variant="outlined"
          />
        ) : (
          <Typography variant="body1" paragraph>
            {project.description || 'Описание проекта отсутствует.'}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default InteriorProjectPage;
