"use client";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, ColorPicker, Form, Input, Space, Typography } from "antd";
import { useState } from "react";
import ColorImage from "./ColorImage";

export default function ColorOption() {
  const [form] = Form.useForm();
  const [fileStrings, setFileStrings] = useState<string[]>([]);

  const setFileString = (index: number, fileString: string) => {
    setFileStrings((prev) => {
      const newFileStrings = [...prev];
      newFileStrings[index] = fileString;
      form.setFieldsValue({
        items: newFileStrings.map((str, i) => ({
          ...form.getFieldValue(["items", i]),
          image: str,
        })),
      });
      return newFileStrings;
    });
  };

  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };

  return (
    <div className="m-2">
      <Form
        labelCol={{ span: 16 }}
        wrapperCol={{ span: 30 }}
        form={form}
        name="dynamic_form_complex"
        onFinish={onFinish}
        style={{ maxWidth: "100%" }}
        autoComplete="off"
        initialValues={{ items: [{}] }}
      >
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Space
                  key={key}
                  style={{ display: "flex" }}
                  className="items-start"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "colorCode"]}
                    getValueFromEvent={(color) => {
                      return "#" + color.toHex();
                    }}
                    initialValue={"#1677ff"}
                    // rules={[
                    //   { required: true, message: "Vui lòng chọn mã màu" },
                    // ]}
                  >
                    <div className="space-y-1">
                      <p className="font-semibold">
                        <span className="text-red-400 font-bold">*</span> Chọn
                        mã màu
                      </p>
                      <ColorPicker defaultValue="#1677ff" showText />
                    </div>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "colorName"]}
                    rules={[
                      { required: true, message: "Vui lòng đặt tên màu" },
                    ]}
                  >
                    <div className="space-y-1">
                      <p className="font-semibold">
                        <span className="text-red-400 font-bold">*</span> Tên
                        màu sắc
                      </p>
                      <Input placeholder="Đen" />
                    </div>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "image"]}
                    valuePropName="fileString"
                    getValueFromEvent={() => {
                      console.log("FILE", fileStrings[index]);
                      return fileStrings[index];
                    }}
                    rules={[
                      { required: true, message: "Vui lòng chọn ảnh minh họa" },
                    ]}
                  >
                    <div className="space-y-1 mr-4">
                      <p className="font-semibold">
                        <span className="text-red-400 font-bold">*</span> Ảnh
                        minh họa(theo màu sắc vừa chọn)
                      </p>
                      <div className="ml-2">
                        <ColorImage
                          setFileString={(fileString: string) =>
                            setFileString(index, fileString)
                          }
                          maxNumber={1}
                        />
                      </div>
                    </div>
                  </Form.Item>
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
