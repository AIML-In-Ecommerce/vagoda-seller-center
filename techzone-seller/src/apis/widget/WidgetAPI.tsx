"use client";

import { DesignTemplateType } from "@/model/DesignTemplateType";
import { WidgetType } from "@/model/WidgetType";
import axios from "axios";

// const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX;
// const WIDGET_PORT = process.env.NEXT_PUBLIC_WIDGET_PORT;

// const oldpublicAPIURL = `${BACKEND_PREFIX}:${WIDGET_PORT}`;
const publicAPIURL = `${process.env.NEXT_PUBLIC_GATEWAY_PREFIX}`;

interface WidgetListResponse {
  status: number;
  data: WidgetType[];
  message: string;
}

export async function POST_GetWidgetList(ids: string[]) {
  const url = (publicAPIURL + "/widgets/list").toString();

  try {
    // console.log(url);
    const requestBody = {
      ids: ids,
    };
    const response = await axios.post(url, requestBody);
    const responseData: WidgetListResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Get widget list successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get widget list",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to get widget list",
      status: 500,
      data: undefined,
    };
  }
}

interface WidgetResponse {
  status: number;
  data: WidgetType;
  message: string;
}

export async function GET_GetWidget(id: string) {
  const url = (publicAPIURL + "/widget/" + id).toString();

  try {
    // console.log(url);
    const response = await axios.get(url);
    const responseData: WidgetResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Get widget successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get widget",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to get widget",
      status: 500,
      data: undefined,
    };
  }
}

export async function POST_CreateWidget(props: WidgetType) {
  const url = (publicAPIURL + "/widget").toString();

  try {
    // console.log(url);
    const requestBody = {
      type: props.type,
      order: props.order,
      visibility: props.visibility,
      element: props.element,
    };

    const response = await axios.post(url, requestBody);
    // {
    //   headers: {
    //     Authorization: `Bearer ${auth.user?.access_token}`,
    //   },
    // }

    const responseData: WidgetResponse = response.data;

    const processedData: WidgetType = {
      _id: responseData.data._id,
      type: responseData.data.type,
      order: responseData.data.order,
      visibility: responseData.data.visibility,
      element: responseData.data.element,
    };

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Create widget successfully",
        status: responseData.status,
        data: processedData,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to create widget",
        status: responseData.status,
        data: processedData,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to create widget",
      status: 500,
      data: undefined,
    };
  }
}

export async function DELETE_DeleteWidget(id: string) {
  const url = (publicAPIURL + "/widget/" + id).toString();

  try {
    // console.log(url);
    const response = await axios.delete(url);
    const responseData: WidgetResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Delete widget successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to delete widget",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to delete widget",
      status: 500,
      data: undefined,
    };
  }
}

export async function PUT_UpdateWidgetOrder(id: string, order: number) {
  const url = (publicAPIURL + "/widget/" + id).toString();

  try {
    // console.log(url);
    const requestBody = {
      order: order,
    };
    const response = await axios.put(url, requestBody);
    const responseData: WidgetResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Update widget successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to update widget",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to update widget",
      status: 500,
      data: undefined,
    };
  }
}

export async function PUT_UpdateWidgetVisibility(
  id: string,
  visibility: boolean
) {
  const url = (publicAPIURL + "/widget/" + id).toString();

  try {
    // console.log(url);
    const requestBody = {
      visibility: visibility,
    };
    const response = await axios.put(url, requestBody);
    const responseData: WidgetResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Update widget successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to update widget",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to update widget",
      status: 500,
      data: undefined,
    };
  }
}

export async function PUT_UpdateWidget(data: WidgetType) {
  const url = (publicAPIURL + "/widget/" + data._id).toString();

  try {
    // console.log(url);
    const requestBody = {
      visibility: data.visibility,
      element: data.element,
    };
    const response = await axios.put(url, requestBody);
    const responseData: WidgetResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Update widget successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to update widget",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to update widget",
      status: 500,
      data: undefined,
    };
  }
}

interface PathResponse {
  status: number;
  data: { path: string };
  message: string;
}

export async function dataUrlToFile(
  dataUrl: string,
  fileName: string
): Promise<File> {
  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();
  return new File([blob], fileName, { type: "image/png" });
}

export async function POST_GetPath(image: string) {
  const url = (publicAPIURL + "/upload").toString();

  if (!image)
    return {
      isDenied: true,
      message: "Failed to create link",
      status: 500,
      data: undefined,
    };

  try {
    // console.log(url);
    let file = await dataUrlToFile(image, "temp");

    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // {
    //   headers: {
    //     Authorization: `Bearer ${auth.user?.access_token}`,
    //   },
    // }

    const responseData: PathResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Create link successfully",
        status: responseData.status,
        data: responseData.data.path,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to create link",
        status: responseData.status,
        data: responseData.data.path,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to create link",
      status: 500,
      data: undefined,
    };
  }
}

interface TemplateResponse {
  status: number;
  data: DesignTemplateType[];
  message: string;
}

export async function GET_GetTemplates() {
  // const url = (oldpublicAPIURL + "/templates").toString();
  const url = (publicAPIURL + "/templates").toString();

  try {
    // console.log(url);
    const response = await axios.get(url);

    const responseData: TemplateResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Get templates successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get templates",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to get templates",
      status: 500,
      data: undefined,
    };
  }
}
