import express from 'express';
import tasks from './routes/tasks';
import notFound from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';

const app = express();

app.use(express.static('../ui/dist'));
app.use(express.json());

app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5002;
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
