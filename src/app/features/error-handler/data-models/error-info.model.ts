import {StackFrame} from 'error-stack-parser';
export interface ErrorInfo {
  name: string;
  appId: string;
  loggedUser: {
    id: number,
    fullName: string,
    email: string
  };
  time: number;
  id: string;
  url: string;
  status: number;
  message: string;
  stack: StackFrame[] | null;
}
