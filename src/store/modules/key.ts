import {Store,Module,ActionContext} from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
import Key from '../entities/key'
import Ajax from '../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from './list-mutations'
interface KeyState extends ListState<Key>{
    editKey:Key;
}
class KeyModule extends ListModule<KeyState,any,Key>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<Key>(),
        loading:false,
        editKey:new Key()
    }
    actions={
        async getAll(context:ActionContext<KeyState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.get('/api/services/app/UserKeyService/GetKeys',{params:payload.data});
            context.state.loading=false;
            let page=reponse.data.result as PageResult<Key>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async create(context:ActionContext<KeyState,any>,payload:any){
            await Ajax.post('/api/services/app/UserKeyService/AddUserKey',payload.data);
        },
        async update(context:ActionContext<KeyState,any>,payload:any){
            await Ajax.put('/api/services/app/UserKeyService/UpdateUserKey',payload.data);
        },
        async delete(context:ActionContext<KeyState,any>,payload:any){
            await Ajax.delete('/api/services/app/UserKeyService/DeleteUserKey?Id='+payload.data.id);
        },
        async get(context:ActionContext<KeyState,any>,payload:any){
            let reponse=await Ajax.get('/api/services/app/UserKeyService/Get?Id='+payload.id);
            return reponse.data.result as Key;
        }
    };
    mutations={
        setCurrentPage(state:KeyState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:KeyState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:KeyState,key:Key){
            state.editKey=key;
        }
    }
}
const keyModule=new KeyModule();
export default keyModule;