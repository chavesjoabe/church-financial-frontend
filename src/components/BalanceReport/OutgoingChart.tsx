import { BarChart } from '@mui/x-charts/BarChart';
import { Balance, BalanceDescriptions } from '../../models/balance.models';
import { balanceDescriptionMapper, getFriendlyName } from '../../helpers/friendlyNames.helper';
import { Card, Typography } from '@mui/material';

type Props = {
  balances: Balance[];
}

export const OutgoingChart: React.FC<Props> = ({ balances }) => {
  const rawLabels = BalanceDescriptions['outgoing'];
  const labels: String[] = BalanceDescriptions['outgoing'].map(item => getFriendlyName(item, balanceDescriptionMapper));

  const outgoingTotal = balances.reduce((acc, curr) => acc += curr.value, 0).toFixed(2);

  const groupedBalances = rawLabels.map(label => {
    const data: Balance[] = balances.filter(item => item.description == label);
    return {
      type: label,
      size: data.length,
      totalValue: data.reduce((acc, curr) => acc += curr.value, 0),
      data,
    }
  });

  console.log("GROUPED");
  console.log(groupedBalances);

  return (
    <Card
      elevation={24}
      sx={{
        marginTop: '30px',
        width: '70%',
        minWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflowX: 'auto',
      }}>
      <BarChart
        xAxis={[{ scaleType: 'band', data: labels }]}
        series={[{ data: groupedBalances.map(item => item.totalValue) }]}
        width={500}
        height={300}
      />
      <Typography>
        Total de saídas: R$ {outgoingTotal}
      </Typography>
    </Card>
  );
}
