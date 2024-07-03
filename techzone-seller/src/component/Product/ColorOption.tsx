"use client";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, ColorPicker, Form, Input, Space, Typography } from "antd";
import { useEffect } from "react";
import ColorImage from "./ColorImage";

interface ColorOptionProps {
  initialValue: { colorCode: string; colorName: string; image: string }[];
  onFormChange: (values: any) => void;
}

export default function ColorOption(props: ColorOptionProps) {
  const [form] = Form.useForm();

  const handleImageChange = (fileString: string, key: any) => {
    const fields = form.getFieldsValue();
    const { colors } = fields;
    Object.assign(colors[key], {
      image: fileString.length > 0 ? fileString : null,
    });
    form.setFieldsValue({ colors });
  };

  const handleFormChange = () => {
    const { colors } = form.getFieldsValue();
    props.onFormChange(form.getFieldsValue());
  };

  useEffect(() => {
    form.setFieldsValue({ colors: props.initialValue });
  }, [props.initialValue, form]);

  return (
    <div className="m-2">
      <Form
        labelCol={{ span: 16 }}
        wrapperCol={{ span: 30 }}
        form={form}
        name="dynamic_form_complex"
        // onFinish={onFinish}
        onFieldsChange={handleFormChange}
        style={{ maxWidth: "100%" }}
        autoComplete="off"
        initialValues={{ items: [{}] }}
      >
        <Form.List name="colors">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Space
                  key={key}
                  style={{ display: "flex" }}
                  className="items-start"
                >
                  <div className="space-y-1">
                    <p className="font-semibold">
                      <span className="text-red-400 font-bold">*</span> Chọn mã
                      màu
                    </p>
                    <Form.Item
                      {...restField}
                      name={[name, "colorCode"]}
                      getValueFromEvent={(color) => {
                        return "#" + color.toHex();
                      }}
                      initialValue={"#1677ff"}
                    >
                      <ColorPicker defaultValue="#1677ff" showText />
                    </Form.Item>{" "}
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold">
                      <span className="text-red-400 font-bold">*</span> Tên màu
                      sắc
                    </p>
                    <Form.Item
                      {...restField}
                      name={[name, "colorName"]}
                      rules={[
                        { required: true, message: "Vui lòng đặt tên màu" },
                      ]}
                    >
                      <Input placeholder="Đen" />
                    </Form.Item>
                  </div>
                  <Form.Item
                    {...restField}
                    name={[name, "image"]}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn ảnh minh họa",
                      },
                    ]}
                  >
                    <div className="space-y-1 mr-4">
                      <p className="font-semibold">
                        <span className="text-red-400 font-bold">*</span> Ảnh
                        minh họa(theo màu sắc vừa chọn)
                      </p>
                      <div className="ml-2">
                        <ColorImage
                          isDisplayLarge={false}
                          initialUrl={form.getFieldValue([
                            "colors",
                            index,
                            "image",
                          ])}
                          setFileString={(fileString: string) => {
                            handleImageChange(fileString, index);
                          }}
                          maxNumber={1}
                        />{" "}
                      </div>
                    </div>
                  </Form.Item>{" "}
                  <MinusCircleOutlined
                    style={{ padding: 0, marginLeft: 8 }}
                    onClick={() => remove(name)}
                  />
                </Space>
              ))}
              <Form.Item>
                <div className="flex items-center">
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Thêm màu sắc
                  </Button>
                </div>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item>
      </Form>
    </div>
  );
}
