import * as React from "react";
import  hoistNonReactStatics from "hoist-non-react-statics";
export const defaultProps = {
  setting: {
    maxLength: 6,
    placeholder: "请输入待办事项"
  }
};

export type DefaultProps = Partial<typeof defaultProps>;
export const withDefaultInputProps =  <Props extends DefaultProps>(OldComponent: React.ComponentType<Props>) => {
  type OwnProps = Omit<Props, keyof DefaultProps>; 
  class NewComponent extends React.Component<OwnProps> {
    public render() {
      const props = { ...defaultProps, ...this.props} as Props;
      return (
        <OldComponent {...props} />
      );
    }
  }
  return hoistNonReactStatics(NewComponent, OldComponent);
};