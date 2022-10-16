import { Schema, model, Types } from 'mongoose';

export interface Version {
  language: string;
  sourceCode: string;
  date: Date;
}

const versionSchema = new Schema<Version>({
  language: String,
  sourceCode: String,
  date: Date,
});

const version = model<Version>('Version', versionSchema);

export default version;
