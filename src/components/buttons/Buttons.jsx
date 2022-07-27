import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const PreviousBtn = ({ className, onClick }) => {
    return (
      <div className={className} onClick={onClick}>
        <ArrowBackIosIcon />
      </div>
    )
  }
  
export const NextBtn = ({ className, onClick }) => {
    return (
        <div className={className} onClick={onClick}>
        <ArrowForwardIosIcon />
        </div>
    )
}