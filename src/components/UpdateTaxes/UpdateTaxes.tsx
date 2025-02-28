import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FilledInput,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/LoginContext";
import { Tax } from "../../models/tax.models";
import { TaxService } from "../../services/TaxService/tax.service";
import { useSnackbar } from "../../providers/SnackbarProvider";

export const UpdateTaxes: React.FC = () => {
  const { getToken } = useAuth();

  const [firstLeaderPercentage, setFirstLeaderPercentage] = useState<number | null>(null);
  const [secondLeaderPercentage, setSecondLeaderPercentage] = useState<number | null>(null);
  const [mainChurchPercentage, setMainChurchPercentage] = useState<number | null>(null);
  const [ministryPercentage, setMinistryPercentage] = useState<number | null>(null);
  const [mainLeaderPercentage, setMainLeaderPercentage] = useState<number | null>(null);
  const [taxes, setTaxes] = useState<Tax | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const token = getToken();
  const { showSnackbar } = useSnackbar();

  const handleOnClickReset = () => {
    setFirstLeaderPercentage(taxes!.firstLeaderPercentage * 100);
    setSecondLeaderPercentage(taxes!.secondLeaderPercentage * 100);
    setMainChurchPercentage(taxes!.mainChurchPercentage * 100);
    setMinistryPercentage(taxes!.ministryPercentage * 100);
    setMainLeaderPercentage(taxes!.mainLeaderPercentage * 100);
  }

  useEffect(() => {
    const fetchTaxes = async () => {
      const taxes = await TaxService.getTaxes(token!);
      setTaxes(taxes);

      setFirstLeaderPercentage(taxes.firstLeaderPercentage * 100);
      setSecondLeaderPercentage(taxes.secondLeaderPercentage * 100);
      setMainChurchPercentage(taxes.mainChurchPercentage * 100);
      setMinistryPercentage(taxes.ministryPercentage * 100);
      setMainLeaderPercentage(taxes.mainLeaderPercentage * 100);
    }

    fetchTaxes();
  }, []);

  const handleOnSubmit = async () => {
    setLoading(true);
    try {
      const requestBody: Tax = {
        firstLeaderPercentage: firstLeaderPercentage! / 100,
        secondLeaderPercentage: secondLeaderPercentage! / 100,
        mainChurchPercentage: mainChurchPercentage! / 100,
        ministryPercentage: ministryPercentage! / 100,
        mainLeaderPercentage: mainLeaderPercentage! / 100,
      }

      await TaxService.updateTaxes(requestBody, token!);
      showSnackbar("Taxas atualizadas com sucesso", 'success');
      return;
    } catch (error) {
      const errorMessage = `ERROR ON UPDATE USER - ${error}`;
      console.error(errorMessage);
      showSnackbar(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      width='100%'
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <Card elevation={24} sx={{
        width: '650px',
        marginTop: '40px',
        padding: '10px'
      }}>
        <CardContent sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
          <Typography variant='h6'>Atualização de taxas e porcentagens</Typography>
          <Typography variant='body1'>Todos os valores são em porcentagem</Typography>
          <FormControl sx={{ width: '100%', marginTop: '15px' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-church-leader-1">Pastor Local 1 (%)</InputLabel>
            <FilledInput
              required
              id="outlined-adornment-church-leader-1"
              onChange={(event) => setFirstLeaderPercentage(Number(event.target.value))}
              value={firstLeaderPercentage}
              type="number"
              inputProps={{ max: 100, min: 1 }}
            />
          </FormControl>
          <FormControl sx={{ width: '100%', marginTop: '15px' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-church-leader-2">Pastor Local 2 (%)</InputLabel>
            <FilledInput
              required
              id="outlined-adornment-church-leader-2"
              onChange={(event) => setSecondLeaderPercentage(Number(event.target.value))}
              value={firstLeaderPercentage}
              type="number"
              inputProps={{ max: 100, min: 1 }}
            />
          </FormControl>
          <FormControl sx={{ width: '100%', marginTop: '15px' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-main-church">Sede (%)</InputLabel>
            <FilledInput
              required
              id="outlined-adornment-main-church"
              onChange={(event) => setMainChurchPercentage(Number(event.target.value))}
              value={mainChurchPercentage}
              type="number"
              inputProps={{ max: 100, min: 1 }}
            />
          </FormControl>
          <FormControl sx={{ width: '100%', marginTop: '15px' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-ministry">Ministério (%)</InputLabel>
            <FilledInput
              required
              id="outlined-adornment-ministry"
              onChange={(event) => setMinistryPercentage(Number(event.target.value))}
              value={ministryPercentage}
              type="number"
              inputProps={{ max: 100, min: 1 }}
            />
          </FormControl>
          <FormControl sx={{ width: '100%', marginTop: '15px' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-main-leader">Apóstolo (%)</InputLabel>
            <FilledInput
              required
              id="outlined-adornment-main-leader"
              onChange={(event) => setMainLeaderPercentage(Number(event.target.value))}
              value={mainLeaderPercentage}
              type="number"
              inputProps={{ max: 100, min: 1 }}
            />
          </FormControl>
        </CardContent>
        <CardActions sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Button onClick={handleOnClickReset} variant='outlined' color='error'>
            Resetar valores
          </Button>
          <Button onClick={handleOnSubmit} variant='contained' color='primary'>
            Atualizar
          </Button>
        </CardActions>
      </Card>
    </Box>

  )
}
