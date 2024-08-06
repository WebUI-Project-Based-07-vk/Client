import axios from 'axios'

export const fetchLanguages = () => {
  return axios.get('http://localhost:8080/constants/spoken-lang')
}
