import express, { Application, Request, Response} from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';


const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.use('/api/v1',router);


// const getAController = (req: Request, res: Response) => {
//   const a = 10;

//   res.send(a);
// };


const test = (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
};
app.get('/', test);

console.log(process.cwd());

// for global error handling
app.use(globalErrorHandler)

app.use(notFound)

export default app;
