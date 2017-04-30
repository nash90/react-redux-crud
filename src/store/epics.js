import { combineEpics } from 'redux-observable';
import { values } from 'lodash';

import * as postsEpics from './employees/epics';

export default combineEpics(
  ...values(postsEpics)
);
