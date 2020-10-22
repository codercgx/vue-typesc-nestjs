<template>
  <div v-if="blogData">
    <h3>{{ id ? "编辑" : "新建" }}{{ Content }}</h3>
    <el-form :model="blogData" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="blogData.name"></el-input>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="blogData.title"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
interface BlogDto {
  name: string;
  title: string;
}
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class BlogCreate extends Vue {
  @Prop() id!: string;
  @Prop() resource!: string;
  blogData: any = {
    name: "",
    title: "",
  };
  content!: string;
  created() {
    console.log(this.id);
    console.log(this.resource);
    this.id && this.getBlogDetile();
  }
  get Content() {
    switch (this.resource) {
      case "blog":
        return "博客";
      // break;
      case "category":
        return "分类";
      // break;
      default:
        return "";
      // break;
    }
  }
  async save() {
    if (this.id && this.resource) {
      this.$confirm("此操作将修改该博客, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          this.$http.put(`${this.resource}s/${this.id}`, this.blogData);
          this.blogData = {};
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.$router.push("/blog/list");
        })
        .catch(async () => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    } else {
      const data = await this.$http.post(`${this.resource}`, this.blogData);
      console.log(this.blogData);
      this.$message.success("新建成功!");
      this.$router.push("blogs/list");
    }
  }

  async getBlogs() {
    const { data } = await this.$http.get("blogs");
    console.log(data);
    this.blogData = data;
  }
  async getBlogDetile() {
    if (this.id && this.resource) {
      const { data } = await this.$http.get(`${this.resource}s/${this.id}`);
      console.log(data);
      this.blogData = data;
    }
  }
}
</script>
