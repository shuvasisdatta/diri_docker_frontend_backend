<template >
  <section>
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="d-flex justify-content-between flex-row bd-highlight mb-3">
          <div class="p-2 bd-highlight">
            <select class="custom-select w-auto" v-model="perPage">
              <option
                v-for="pageNo in perPageOption"
                :key="pageNo"
                :value="pageNo"
              >Show {{ pageNo }}</option>
            </select>
          </div>
          <div class="p-2 bd-highlight">
            <input
              type="text"
              class="form-control"
              v-model="searchQuery"
              id="inlineFormInputName2"
              placeholder="Search here ..."
            />
          </div>
          <div class="p-2 bd-highlight">
            <button type="submit" class="btn btn-primary" @click="createModal">Add</button>
          </div>
        </div>

        <div class="table-responsive">
          <vuetable
            ref="vuetable"
            :api-mode="false"
            :fields="fields"
            :per-page="perPage"
            :data-manager="dataManager"
            pagination-path="pagination"
            :css="css.table"
            @vuetable:pagination-data="onPaginationData"
          >
            <div slot="actions" slot-scope="props">
              <button class="btn btn-success" @click="onActionClicked('edit-item', props.rowData)">
                <i class="fas fa-edit"></i>
              </button>
              &nbsp;
              <button
                class="btn btn-danger"
                @click="onActionClicked('delete-item', props.rowData)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </vuetable>
          <div style="padding-top:10px">
            <vuetable-pagination
              ref="pagination"
              :css="css.pagination"
              @vuetable-pagination:change-page="onChangePage"
            ></vuetable-pagination>
          </div>
        </div>
        <!-- /.table-responsive -->
      </div>
      <!-- /.col-12-->
    </div>
    <div
      class="modal fade"
      id="Modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="ModalTitle"
      aria-hidden="true"
      data-backdrop="static"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 v-if="!editMode" class="modal-title" id="ModalTitle">Add Department</h5>
            <h5 v-else class="modal-title" id="ModalTitle">Update Department</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="editMode? updateData() : createData()">
            <div class="modal-body">
              <div class="form-group">
                <label for="title">Title</label>
                <input
                  type="text"
                  v-model="payload.title"
                  id="title"
                  name="title"
                  placeholder="Title"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="title">Parent</label>
                <multiselect
                  v-model="parent_value"
                  :options="menus"
                  :searchable="true"
                  :close-on-select="true"
                  label="title"
                  track-by="url"
                  @select="payloadParentIdSet"
                ></multiselect>
              </div>
              <div class="form-group">
                <label for="url">Url</label>
                <input
                  type="text"
                  v-model="payload.url"
                  id="url"
                  name="url"
                  placeholder="Url"
                  class="form-control"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
              <button v-if="!editMode" type="submit" class="btn btn-primary">Create</button>
              <button v-else type="submit" class="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- ./Modal -->
  </section>
</template>

<script lang="js">
import Vuetable from 'vuetable-2';
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import _ from "lodash";
import css4bootstrap from "@/css4bootstrap.js";
export default {
  name: 'adminMenu',
  components: {
    Vuetable,
    VuetablePagination,
  },
  data() {
    let sortOrders = [];
      let columns = [
        {name: 'title', label: 'Title', sortable: true, filterable: true },
        {name: 'Parent', label: 'Parent', sortable: true, filterable: true },
        {name: 'url', label: 'Url', sortable: true, filterable: true },
        {name: 'created_at', label: 'Created', sortable: true, filterable: false},
        {name: 'updated_at', label: 'Updated', sortable: true, filterable: false},
        {name: 'modify', label: 'Modify', sortable: false, filterable: false}
      ];
      columns.forEach((column) => {
        sortOrders[column.name] = -1;
      });

    return {
      searchQuery: '',
      css: css4bootstrap,
      perPageOption: [3, 5, 10, 20, 50],
      perPage: 3,
      fields: [
        {
          name: 'title',
          sortField: 'title'
        },
        {
          name: 'parent.title',
          title: 'Parent',
          sortField: 'parent_id'
        },
        {
          name: 'url',
          sortField: 'url'
        },
        {
          name: 'created_at',
          title: 'Created',
        },
        {
          name: 'updated_at',
          title: 'Updated',
        },
        'actions'
      ],      
      editMode: false,
      api_url: '/nav',
      menus: [],
      payload: {
        id: null,
        parent_id: null,
        title: null,
        url: ''
      },
      parent_value: null,
    }
  },
  computed: {
    filteredMenus() {
      const query = this.searchQuery.toLowerCase();
      return this.menus.filter(e => e.title.toLowerCase().includes(query) || e.parent?.title.toLowerCase().includes(query));
    }
  },
  watch: {
    // eslint-disable-next-line
    filteredMenus(newVal, oldVal) {
      this.$refs.vuetable.refresh();
    }
  },
  methods: {
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    dataManager(sortOrder, pagination) {
      if (this.menus.length < 1) return;

      let local = this.filteredMenus;
      // console.log(local);

      // sortOrder can be empty, so we have to check for that as well
      if (sortOrder.length > 0) {
        // console.log("orderBy:", sortOrder[0].sortField, sortOrder[0].direction);
        local = _.orderBy(
          local,
          sortOrder[0].sortField,
          sortOrder[0].direction
        );
      }

      pagination = this.$refs.vuetable.makePagination(
        local.length,
        this.perPage
      );
      // console.log('pagination:', pagination)
      let from = pagination.from - 1;
      let to = from + this.perPage;

      return {
        pagination: pagination,
        data: _.slice(local, from, to)
      };
    },
    onActionClicked(action, data) {
      switch (action) {
        case 'edit-item':
          this.editModal(data);
          break;
        case 'delete-item':
          this.deleteConfirmation(data.id);
          break;
        default:
          break;
      }
    },

    payloadParentIdSet(selectedMenu) {
      this.payload.parent_id = selectedMenu.id;
    },

    initPayload(data = {}) {
      this.payload.id = data.id;
      this.payload.parent_id = data.parent_id;
      this.payload.title = data.title;
      this.payload.url = data.url;
    },
    

    createModal() {
      this.editMode = false;
      
      this.initPayload();
      this.$jQuery('#Modal').modal('show');
    },

    editModal(data) {
      this.editMode = true;
      this.initPayload(data);
      // set the parentMenu selected item
      this.parent_value = this.menus.find(e => e.id === this.payload.parent_id)
      this.$jQuery('#Modal').modal('show');
    },

    async getData() {
      const url = this.api_url;
      try {
        const res = await this.$http.get(url);
        this.menus = res.data;
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },

    async createData() {
      const url = this.api_url;
      try {
        const payload = {
          parent_id: this.payload.parent_id,
          title: this.payload.title,
          url: this.payload.url,
        };
        
        const res = await this.$http.post(url, payload);
        this.$awn.success('Created successfully');
        console.log(res);
        
        // emit an event to refetch data to update table
        this.$emit('created');
        
        this.$jQuery('#Modal').modal('hide');
      } catch (err) {
        console.log(err);
      }
    },

    async updateData() {
      const url = this.api_url + '/' + this.payload.id;
      try {
        const payload = {
          parent_id: this.payload.parent_id,
          title: this.payload.title,
          url: this.payload.url,
        };
        
        const res = await this.$http.put(url, payload);
        this.$awn.success('Udated successfully');
        console.log(res);
        
        // emit an event to refetch data to update table
        this.$emit('created');
        
        this.$jQuery('#Modal').modal('hide');
      } catch (err) {
        console.log(err);
      }
    },

    deleteConfirmation(id) {
      this.$awn.confirm(
        'Are you sure?',
        () => this.deleteData(id),
        () => {},
        {
          labels: {
            confirm: 'Dangerous action'
          }
        }
      );
    },

    async deleteData(id) {
      const url = this.api_url + '/' + id;
      try {
        await this.$http.delete(url);
        this.$awn.success('Deleted successfully');
        
        // emit an event to refetch data to update table
        this.$emit('created');
      } catch (err) {
        console.log(err);
      }
    }
  },
   created() {
      this.getData();

      // listen to events
      this.$on('created', () => {
        this.getData();
      })
   }
}
</script>

<style scoped lang="scss">
</style>