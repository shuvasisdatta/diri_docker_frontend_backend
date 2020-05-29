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
              <button class="btn btn-sm btn-success" @click="onActionClicked('edit-item', props.rowData)">
                <i class="fas fa-edit"></i>
              </button>
              &nbsp;
              <button
                class="btn btn-sm btn-danger"
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
            <h5 v-if="!editMode" class="modal-title" id="ModalTitle">Add News</h5>
            <h5 v-else class="modal-title" id="ModalTitle">Update News</h5>
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
                <label for="title">Author</label>
                <multiselect
                  v-model="user_value"
                  :options="users"
                  :searchable="true"
                  :close-on-select="true"
                  label="name"
                  track-by="id"
                  @select="payloadUserIdSet"
                ></multiselect>
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <textarea
                  type="text"
                  v-model="payload.description"
                  id="description"
                  name="description"
                  placeholder="description"
                  class="form-control"
                >
                </textarea>
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
  name: 'adminNews',
  components: {
    Vuetable,
    VuetablePagination,
  },
  data() {
    return {
      searchQuery: '',
      css: css4bootstrap,
      perPageOption: [5, 10, 20, 50],
      perPage: 5,
      fields: [
        {
          name: 'title',
          sortField: 'title'
        },
        {
          name: 'description',
          sortField: 'description'
        },
        {
          name: 'user.name',
          title: 'Author',
          sortField: 'user_id'
        },
        {
          name: 'created_at',
          title: 'Created',
        },
        {
          name: 'updated_at',
          title: 'Updated',
        },
        { 
          name: 'actions',
          width: '100px',
        }
      ],      
      editMode: false,
      api_url: '/news',
      news: [],
      users: [],
      payload: {
        id: null,
        user_id: null,
        title: null,
        description: ''
      },
      user_value: null,
    }
  },
  computed: {
    filteredNews() {
      const query = this.searchQuery.toLowerCase();
      return this.news.filter(e => e.title.toLowerCase().includes(query) || e.description.toLowerCase().includes(query) || e.user?.name.toLowerCase().includes(query));
    }
  },
  watch: {
    // eslint-disable-next-line
    filteredNews(newVal, oldVal) {
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
      if (this.news.length < 1) return;

      let local = this.filteredNews;
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

    payloadUserIdSet(selectedMenu) {
      this.payload.user_id = selectedMenu.id;
      console.log(this.payload.user_id)
    },

    initPayload(data = {}) {
      this.payload.id = data.id;
      this.payload.user_id = data.user_id;
      this.payload.title = data.title;
      this.payload.description = data.description;
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
      this.user_value = this.users.find(e => e.id === this.payload.user_id)
      this.$jQuery('#Modal').modal('show');
    },

    async getData() {
      const url = this.api_url;
      try {
        let res = await this.$http.get(url);
        this.news = res.data;
        res = await this.$http.get('/user');
        this.users = res.data;
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },

    async createData() {
      const url = this.api_url;
      try {
        const payload = {
          user_id: this.payload.user_id,
          title: this.payload.title,
          description: this.payload.description,
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
          user_id: this.payload.user_id,
          title: this.payload.title,
          description: this.payload.description,
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