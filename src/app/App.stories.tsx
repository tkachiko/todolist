import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {App} from './App'
import {HashRouterDecorator, ReduxStoreProviderDecorator} from '../stories/ReduxStoreProviderDecorator'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/App',
  component: App,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  decorators: [ReduxStoreProviderDecorator, HashRouterDecorator],
} as ComponentMeta<typeof App>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof App> = (args) => <App demo={true} {...args} />

export const AppStory = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args