import { registerAs } from '@nestjs/config';
import { DocumentBuilder } from '@nestjs/swagger';

export default registerAs('docs', () => {
  return new DocumentBuilder()
    .setTitle(process.env.DOCS_TITLE)
    .setDescription(process.env.DOCS_DESCRIPTION)
    .setVersion(process.env.DOCS_VERSION)
    .addBearerAuth()
    .build();
});
