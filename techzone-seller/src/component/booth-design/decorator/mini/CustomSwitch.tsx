import { Switch } from "antd";
import { useMemo } from "react";

interface SwitchProps {
  isSwitched: boolean;
  setIsSwitched: (value: boolean) => void;
}

export default function CustomSwitch(props: SwitchProps) {
  const onChangeSwitch = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    props.setIsSwitched(checked);
  };

  const switchColor = useMemo(() => {
    if (props.isSwitched) {
      return "#1677ff";
    } else return "lightGray";
  }, [props.isSwitched]);

  return (
    <Switch
      checked={props.isSwitched}
      checkedChildren="Hiện"
      unCheckedChildren="Ẩn"
      style={{ borderColor: "black", backgroundColor: switchColor }}
      onChange={onChangeSwitch}
    />
  );
}
