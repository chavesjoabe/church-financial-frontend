import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography
} from "@mui/material"
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from "dayjs";
import { BalanceService, CreateBalancePayload } from '../../services/BalanceService/balance.service'
import { useNavigate } from "react-router-dom";
import { UrlConstants } from "../../constants/url.contants";
import { useAuth } from "../../context/LoginContext";
import { BalanceDescriptions, BalanceIncomingTypes, BalanceTypes } from "../../models/balance.models";
import { formatDate } from "../../helpers/date.helper";
import { IncomingOutgoingModal } from "./IncomingOutgoingModal";
import { balanceDescriptionMapper, getFriendlyName, incomingTypeMapper } from "../../helpers/friendlyNames.helper";

type Props = {
  type: 'incoming' | 'outgoing';
}

export const IncomingOutgoingCard: React.FC<Props> = ({ type }) => {
  const [balanceEntryDay, setBalanceEntryDay] = useState<Dayjs | null>(null);
  const [balanceEntryValue, setBalanceEntryValue] = useState<number | null>(null);
  const [responsible, setResponsible] = useState<string | null>(null);
  const [incomingType, setIncomingType] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const [freeDescription, setFreeDescription] = useState<string>('');
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { getToken } = useAuth();

  const token = getToken() || '';

  const hasAllRequiredFields = (): boolean => {
    const validations: Record<string, boolean> = {
      incoming: (balanceEntryValue !== null && balanceEntryDay !== null && incomingType !== null && description !== null),
      outgoing: (balanceEntryValue !== null && balanceEntryDay !== null && description !== null),
    };

    return validations[type];
  }

  const handleOpen = () => {
    if (!hasAllRequiredFields()) {
      return window.alert('PLEASE FILL ALL FIELDS')
    }

    setOpen(true)
  }

  const handleOnClick = async () => {
    try {
      setLoading(true);
      if (!hasAllRequiredFields()) {
        return window.alert('PLEASE FILL ALL FIELDS')
      }

      const balancePayload: CreateBalancePayload = {
        type: type.toUpperCase(),
        value: balanceEntryValue ? balanceEntryValue : 0,
        responsible: responsible ? responsible : '',
        balanceDate: balanceEntryDay ? balanceEntryDay.toDate() : new Date(),
        description: description,
        freeDescription: freeDescription,
        incomingType: incomingType,
      }

      const createBalanceResponse = await BalanceService.createBalance(balancePayload, token);
      return navigate(UrlConstants.BALANCE_SUCCESS, { state: createBalanceResponse });
    } catch (error) {
      const errorMessage = `ERROR ON CREATE BALANCE - ${error}`;
      window.alert(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const handleOnChangeDate = (newValue: Dayjs | null) => {
    if (newValue) {
      setBalanceEntryDay(newValue); // Valid Day.js object
    } else {
      setBalanceEntryDay(null); // Handle invalid or cleared input
    }
  }

  const getTypeFriendlyName = (type: string) => {
    const typeNameMapper: Record<string, string> = {
      incoming: 'Entrada de valores',
      outgoing: 'Saída de valores',
    }

    return typeNameMapper[type];
  }

  const getBalanceDescriptions = (description: string) => {
    return BalanceDescriptions[description];
  }

  const handleOnClickClear = () => {
    setBalanceEntryDay(null);
    setBalanceEntryValue(null);
    setResponsible('');
    setDescription('');
    setFreeDescription('');
  }

  return (
    <Box
      width='100%'
      display='flex'
      flexDirection='column'
      alignItems='center'
      alignContent='center'
      marginTop='50px'
    >
      <Card elevation={24} sx={{ width: '80%', maxWidth: 800 }}>
        <CardHeader
          title={getTypeFriendlyName(type)}
        />
        <CardContent>
          <Typography>
            Selecione a data do lançamento
          </Typography>
          <FormControl fullWidth >
            <
              DatePicker
              value={balanceEntryDay}
              onChange={handleOnChangeDate}
              slotProps={{
                textField: {
                  helperText: 'Enter a date or use the calendar picker',
                },
              }}
            />
          </FormControl>
          {
            type === BalanceTypes.INCOMING
              ? <TextField
                id="outlined-select-currency-a"
                select
                label="Tipo da Entrada"
                fullWidth
                value={incomingType}
                onChange={(e) => setIncomingType(e.target.value)}
                sx={{ marginTop: '20px' }}
              >
                {Object.values(BalanceIncomingTypes).map((type: string) => (
                  <MenuItem key={type} value={type}>
                    {getFriendlyName(type, incomingTypeMapper)}
                  </MenuItem>
                ))}
              </TextField>
              : ''
          }
          <FormControl fullWidth sx={{ marginTop: '20px' }} >
            <InputLabel htmlFor="outlined-adornment-amount">Valor</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Entrada"
              required
              type="number"
              value={balanceEntryValue}
              onChange={(e) => setBalanceEntryValue(Number(e.target.value))}
            />
          </FormControl>
          <TextField
            id="outlined-select-currency-a"
            select
            label={type === BalanceTypes.INCOMING ? "Forma de pagamento" : "Tipo"}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ marginTop: '20px' }}
          >
            {getBalanceDescriptions(type).map((type: string) => (
              <MenuItem key={type} value={type}>
                {getFriendlyName(type, balanceDescriptionMapper)}
              </MenuItem>
            ))}
          </TextField>
          <FormControl fullWidth sx={{ marginTop: '20px' }} >
            <InputLabel htmlFor="free-description">Descrição Livre</InputLabel>
            <OutlinedInput
              id="free-description"
              label="freeDescription"
              required
              value={freeDescription}
              onChange={(e) => setFreeDescription(e.target.value)}
            />
          </FormControl>
          <Box
            display='flex'
            justifyContent='space-between'
            width='100%'
            marginTop='30px'
          >
            <Button
              variant='outlined'
              color='error'
              onClick={handleOnClickClear}
              disabled={loading}
            >
              Limpar
            </Button>
            <Button
              variant='contained'
              onClick={handleOpen}
              type='submit'
              disabled={loading}
            >
              Enviar para aprovação
            </Button>
          </Box>
        </CardContent>
      </Card>
      <IncomingOutgoingModal
        balanceEntryValue={balanceEntryValue ?? 0}
        balanceEntryDay={formatDate.format(new Date(balanceEntryDay as unknown as string))}
        description={description}
        type={type}
        handleClose={handleClose}
        open={open}
        incomingType={incomingType ?? ''}
        loading={loading}
        handleOnClick={handleOnClick}
      />
    </Box>
  )
}

