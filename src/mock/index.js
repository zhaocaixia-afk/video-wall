import Mock from 'mockjs'
import apiData from './data.json'

Mock.mock('/menu', { code: 0, data: apiData })
