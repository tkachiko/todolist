import {Provider} from 'react-redux';
import {ReactNode} from 'react';
import {storyBookStore} from '../stories/AppWithRedux.stories';

export const ReduxStoreProviderDecorator = (storyFn: () => ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};