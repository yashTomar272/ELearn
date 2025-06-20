import {XAxis,Tooltip,Legend,LineChart,YAxis,Line} from 'recharts'

 export default function AnalyticII(){
   const data02 = [
     {
       Student: 4000,
       Buy: 2400,
     },
     {
       Student: 3000,
       Buy: 1398,
     },
     {
       Student: 2000,
       Buy: 4000,
     },
     {
       Student: 2780,
       Buy: 3908,
     },
     {
       Student: 1890,
       Buy: 2000,
     },
   ];

  return(
    <>
      <div className="AnalyticII d-flex align-items-center flex-column justify-content-center  position- h-100" style={{zIndex:"1"}}>
        <LineChart
          width={260}
          height={220}
          data={data02}
          margin={{ right: 10, top: 10 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Student" stroke="#810551" />
          <Line type="monotone" dataKey="Buy" stroke="#00464e" />
        </LineChart>
        <div className='d-flex'>
  <span className="Student" style={{color:"#00464e"}}>Student/</span>
      <span className="Earnings" style={{color:"#810551"}}>BuyCourses</span>
</div>
      </div>
    </>
  )
}