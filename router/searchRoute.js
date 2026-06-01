import express from 'express'
import { searchController } from '../controller/searchController.js'

export const searchRoute = express.Router()

searchRoute.get('/api/search', searchController)