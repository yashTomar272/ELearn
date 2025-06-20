import {XAxis,CartesianGrid,Tooltip,BarChart,Legend,Bar} from 'recharts'
export default function AnalyticI(){
  const data = [
    {
      "name": "jan",
      "Student": 4000,
      "Earnings": 2400
    },
    {
      "name": "feb",
      "Student": 3000,
      "Earnings": 1398
    },
    {
      "name": "mar",
      "Student": 2000,
      "Earnings": 9800
    },
    {
      "name": "april",
      "Student": 2780,
      "Earnings": 3908
    },
    {
      "name": "may",
      "Student": 1890,
      "Earnings": 4800
    },
    {
      "name": "june",
      "Student": 2390,
      "Earnings": 3800
    },
    {
      "name": "july",
      "Student": 3490,
      "Earnings": 4300
    }
  ]


        return(
        <>
    <div className="Analytic d-flex align-items-center flex-column justify-content-center  position- h-100" style={{zIndex:"1"}}>
            <header className="d-flex justify-content-center align-items-center w-100 fw-bold">
      
          </header>
        <BarChart className='Chart' width={300} height={250} data={data}>
          <CartesianGrid strokeDasharray="100 10" />
          <XAxis dataKey="name" />
        <Tooltip />
        <Legend />
        <Bar dataKey="Student" fill="#00464e" />
        <Bar dataKey="Earnings" fill="#810551" />
      </BarChart>
    
<div className='d-flex'>
  <span className="Student" style={{color:"#00464e"}}>Student/</span>
      <span className="Earnings" style={{color:"#810551"}}>Earnings</span>
</div>

    </div>

        </>)}


