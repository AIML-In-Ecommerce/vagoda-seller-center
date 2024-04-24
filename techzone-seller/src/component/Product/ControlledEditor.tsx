import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export class EditorConvertToHTML extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState: EditorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          // wrapperClassName="demo-wrapper"
          // editorClassName="demo-editor"
          // toolbarClassName="toolbarClassName"
          onEditorStateChange={this.onEditorStateChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
        />
        {/* <Editor
          toolbar={{
            options: [
              "inline",
              "blockType",
              "fontSize",
              "fontFamily",
              "list",
              "textAlign",
              "colorPicker",
              "link",
              "embedded",
              "emoji",
              "image",
              "remove",
              "history",
            ],
            inline: { inDropdown: false },
            blockType: { inDropdown: true },
            fontSize: { className: undefined },
            fontFamily: { className: undefined },
            list: { inDropdown: false },
            textAlign: { inDropdown: false },
            colorPicker: { className: undefined },
            link: { inDropdown: false },
            emoji: { className: undefined },
            image: {
              uploadEnabled: true,
              uploadCallback: () => {},
              alt: { present: false, mandatory: false },
            },
            remove: { className: undefined },
            history: { inDropdown: false },
          }}
        /> */}
        <textarea
          className="w-full"
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      </div>
    );
  }
}

export default EditorConvertToHTML;
