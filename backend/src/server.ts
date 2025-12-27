require('dotenv').config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pg from 'pg';
import { Pool } from 'pg';
import errorHandler from 'errorhandler';

const app = express();
const port = process.env.PORT || 3000;
