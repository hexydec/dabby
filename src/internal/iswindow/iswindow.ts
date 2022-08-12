export default (obj: any): obj is Window => obj != null && obj === obj.window;
