import LanguageIcon from '@mui/icons-material/Language'
import NumbersIcon from '@mui/icons-material/Numbers'
import TvIcon from '@mui/icons-material/Tv'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import BiotechIcon from '@mui/icons-material/Biotech'
import PaletteIcon from '@mui/icons-material/Palette'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import LegendToggleIcon from '@mui/icons-material/LegendToggle'
import ScienceIcon from '@mui/icons-material/Science'
import StarIcon from '@mui/icons-material/Star'

interface Category {
  backgroundColor: string
  icon: React.ElementType
  iconColor: string
  offers: number
  name: string
}

export const categoriesData: Category[] = [
  {
    id: '1',
    backgroundColor: '#dcedc8',
    icon: LanguageIcon,
    iconColor: '#aed581',
    offers: 234,
    name: 'Languages'
  },
  {
    id: '2',
    backgroundColor: '#fff3e0',
    icon: NumbersIcon,
    iconColor: '#ffcc80',
    offers: 234,
    name: 'Mathematics'
  },
  {
    id: '3',
    backgroundColor: '#e0e0e0',
    icon: TvIcon,
    iconColor: '#757575',
    offers: 234,
    name: 'Computer Science'
  },
  {
    id: '4',
    backgroundColor: '#fce4ec',
    icon: MusicNoteIcon,
    iconColor: '#f06292',
    offers: 234,
    name: 'Music'
  },
  {
    id: '5',
    backgroundColor: '#e0f7fa',
    icon: DesignServicesIcon,
    iconColor: '#4dd0e1',
    offers: 234,
    name: 'Design'
  },
  {
    id: '6',
    backgroundColor: '#ffebee',
    icon: LanguageIcon,
    iconColor: '#ef5350',
    offers: 234,
    name: 'History'
  },
  {
    id: '7',
    backgroundColor: '#e0e0e0',
    icon: BiotechIcon,
    iconColor: '#757575',
    offers: 234,
    name: 'Biology'
  },
  {
    id: '8',
    backgroundColor: '#dcedc8',
    icon: PaletteIcon,
    iconColor: '#aed581',
    offers: 234,
    name: 'Painting'
  },
  {
    id: '9',
    backgroundColor: '#fff3e0',
    icon: AccountBalanceIcon,
    iconColor: '#ffcc80',
    offers: 234,
    name: 'Finances'
  },
  {
    id: '10',
    backgroundColor: '#ffebee',
    icon: LegendToggleIcon,
    iconColor: '#ef5350',
    offers: 234,
    name: 'Audit'
  },
  {
    id: '11',
    backgroundColor: '#fce4ec',
    icon: ScienceIcon,
    iconColor: '#f06292',
    offers: 234,
    name: 'Chemistry'
  },
  {
    id: '12',
    backgroundColor: '#e0f7fa',
    icon: StarIcon,
    iconColor: '#4dd0e1',
    offers: 234,
    name: 'Astronomy'
  }
]
