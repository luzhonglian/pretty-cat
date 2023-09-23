<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 302px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>

<script>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

export default {
  components: { Editor, Toolbar },
  emits: ["contentInput"],
  props: { realHtml: {} },
  setup(props, ctx) {
    // 编辑器实例，必须用 shallowRef
    const handleChange = () => {
      ctx.emit("contentInput", valueHtml.value);
    };

    const editorRef = shallowRef();

    // 内容 HTML
    const valueHtml = ref("");

    // 模拟 ajax 异步获取内容
    // onMounted(() => {
    //     setTimeout(() => {
    //         valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
    //     }, 1500)
    // })

    props.realHtml && (valueHtml.value = props.realHtml);

    const toolbarConfig = {};
    const editorConfig = {
      placeholder: "请输入内容...",
      MENU_CONF: {
        uploadImage: {
          server: "/backstage-api/cat/content-pic",

          fieldName: "file",
          customInsert(res, insertFn) {
            const url = "http://localhost:3000" + res.url;
            if (res.ActionType == "ok") {
              insertFn(url);
            }
          },
        },
      },
    };

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    const handleCreated = (editor) => {
      editorRef.value = editor; // 记录 editor 实例，重要！
    };

    return {
      editorRef,
      valueHtml,
      mode: "default", // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleChange,
    };
  },
};
</script>

<style lang="scss" scoped></style>
