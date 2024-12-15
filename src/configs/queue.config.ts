import { registerAs } from '@nestjs/config';

export const bullConfig = registerAs('bull', () => ({
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  },
}));

export const vpsQueueConfig = registerAs('vpsQueue', () => ({
  limiter: {
    max: parseInt(process.env.VPS_QUEUE_LIMITER_MAX, 10) || 10,
    duration: parseInt(process.env.VPS_QUEUE_LIMITER_DURATION, 10) || 20000,
    bounceBack: process.env.VPS_QUEUE_LIMITER_BOUNCE_BACK === 'true',
  },
  defaultJobOptions: {
    removeOnComplete:
      process.env.VPS_QUEUE_DEFAULT_JOB_OPTIONS_REMOVE_ON_COMPLETE === 'true',
    removeOnFail:
      process.env.VPS_QUEUE_DEFAULT_JOB_OPTIONS_REMOVE_ON_FAIL === 'true',
  },
}));
