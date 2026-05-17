import express from 'express';
import tasks from './routes/tasks';
import notFound from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';
import prisma from './db/connect';

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.static('../ui/dist'));

app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5002;
app.listen(port, () => console.log(`Server is listening on port ${port}...`));

const shutdown = () => prisma.$disconnect().finally(() => process.exit(0));
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
