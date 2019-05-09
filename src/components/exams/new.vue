<template>
  <div id="new">
    <div style="margin-bottom: 20px;">
      <el-button
        size="small"
        @click="addTab(editableTabsValue2)"
      >
        add tab
      </el-button>
      </el-button>
    </div>
    <el-tabs v-model="editableTabsValue2" type="card" closable @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item, index) in editableTabs2"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <examModel></examModel>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import examModel from '@/components/exams/model'

  export default {
    name: "new",
    data() {
      return {
        editableTabsValue2: '2',
        editableTabs2: [{
          title: '试卷 1',
          name: '1',
        }],
        tabIndex: 1
      }
    },
    components: {
      examModel
    },
    methods: {
      addTab(targetName) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs2.push({
          title: '试卷' + newTabName,
          name: newTabName,
        });
        this.editableTabsValue2 = newTabName;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs2;
        let activeName = this.editableTabsValue2;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue2 = activeName;
        this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
      }
    }
  }
</script>

<style scoped>

</style>
