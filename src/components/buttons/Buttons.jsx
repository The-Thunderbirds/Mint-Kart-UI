import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const PreviousBtn = ({ onClick }) => {
    return (
      <div onClick={onClick}>
        <ArrowBackIosIcon />
      </div>
    )
  }
  
export const NextBtn = ({ onClick }) => {
    return (
        <div onClick={onClick}>
        <ArrowForwardIosIcon />
        </div>
    )
}