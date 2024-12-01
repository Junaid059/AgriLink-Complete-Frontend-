import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function CircularProgress({ value }) {
  return (
    <div className="w-32 h-32 mx-auto">
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        styles={buildStyles({
          textSize: '16px',
          pathColor: '#10B981',
          textColor: '#10B981',
          trailColor: '#E5E7EB',
        })}
      />
    </div>
  );
}

export default CircularProgress;
