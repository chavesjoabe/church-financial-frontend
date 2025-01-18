import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { SvgIconComponent } from '@mui/icons-material'

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import PersonIcon from '@mui/icons-material/Person';
import SummarizeIcon from '@mui/icons-material/Summarize';

interface GridItemProps {
  icon: SvgIconComponent;
  title: string;
  subtitle: string;
}

const GridItem: React.FC<GridItemProps> = ({ icon: Icon, title, subtitle }) => {
  return (
    <Paper
      sx={{
        padding: '20px',
        minHeight: '180px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease', // Add smooth animation
        '&:hover': {
          transform: 'scale(1.05)', // Scale slightly when hovered
        }
      }}>
      {Icon && <Icon fontSize='large' color='primary' />}
      <Typography fontWeight='bold' variant="button" marginTop='10px'>
        {title}
      </Typography>
      <Typography variant="body2" marginTop='10px' >
        {subtitle}
      </Typography>
    </Paper>
  )
}

export const HomeCard: React.FC = () => {
  return (
    <Box
      width='100%'
      display='flex'
      alignItems='center'
      alignContent='center'
      justifyContent='center'
      marginTop='50px'
    >
      <Card elevation={24} sx={{ width: '80%', maxWidth: 800 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant='h5' fontWeight='bold' marginTop='20px' >
            Ebenezer Riacho Grande - Tesouraria
          </Typography>
          <Typography marginTop='20px' >
            Portal para lançamento dos dízimos, ofertas e contribuições dos cultos.
          </Typography>
          <Grid container spacing={3} marginTop='20px'>
            <Grid item xs={12} sm={6}>
              <
                GridItem
                icon={AttachMoneyIcon}
                title='Lançamento de Entradas'
                subtitle='Para lançar uma nova entrada clique na aba ENTRADA DE VALORES e preencha os campos do formulário'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <
                GridItem
                icon={MoneyOffIcon}
                title='Lançamento de saídas'

                subtitle='Para lançar uma nova entrada clique na aba SAÍDA DE VALORES e preencha os campos do formulário' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <
                GridItem
                icon={PersonIcon}
                title='Criação de Usuários'
                subtitle='É possível criar novos usuários para compor a equipe de tesouraria'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <
                GridItem
                icon={SummarizeIcon}
                title='Extração de relatórios'

                subtitle='É possível extrair relatórios de acordo com o período solicitado' />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

