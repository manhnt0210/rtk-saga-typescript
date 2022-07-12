import { ChairAlt, ChatBubble, LineAxisOutlined, PeopleAlt } from '@mui/icons-material';
import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import { styled } from "@mui/material/styles";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import StatisticItem from './components/StatisticItem';
import StudentRankingList from './components/StudentRankList';
import Widget from './components/Widget';
import {
  dashboardActions,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingByCityList
} from './dashboardSlice';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistics);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const RankingByCityList = useAppSelector(selectRankingByCityList);

  const StyledBox = styled(Box)(({theme}) => ({
    position: 'relative',
    padding: theme.spacing(1)
  }));

  const StyledLoading = styled(LinearProgress)(({theme}) => ({
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  }));

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  return (
    <StyledBox>
      {loading && <StyledLoading />}

      {/* Statistic section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" color="primary"/>}
            label="male"
            value={statistics.maleCount}
          />
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<ChairAlt fontSize="large" color="primary"/>}
            label="female"
            value={statistics.femaleCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<LineAxisOutlined fontSize="large" color="primary"/>}
            label="mark >= 8"
            value={statistics.highMarkCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<ChatBubble fontSize="large" color="primary"/>}
            label="mark < 5"
            value={statistics.lowMarkCount}
          />
        </Grid>
      </Grid>

      {/* All students ranking */}
      <Box mt={5}>
        <Typography variant="h4">All Students</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with highest mark">
                <StudentRankingList studentList={highestStudentList}/>
              </Widget>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with lowest mark">
                <StudentRankingList studentList={lowestStudentList}/>
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Ranking By City */}
      <Box mt={5}>
        <Typography variant="h4">Ranking By City</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            {RankingByCityList.map(ranking => (
              <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
                <Widget title={ranking.cityId}>
                  <StudentRankingList studentList={ranking.rankingList}/>
                </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </StyledBox>
  );
}
