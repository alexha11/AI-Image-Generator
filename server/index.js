import app from './app.js';
import logger from './utils/logger.js';

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});