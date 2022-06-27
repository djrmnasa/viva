<template>
    <div>
        <Modal
         :title="L('EditKey')"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="keyForm"  label-position="top" :rules="keyRule" :model="key">
                <FormItem :label="L('UserName')" prop="userName">
                    <Input v-model="key.userName" :maxlength="32" :minlength="2"></Input>
                </FormItem>
                <FormItem :label="L('Key')" prop="key">
                    <Input v-model="key.key" :maxlength="32" :minlength="2"></Input>
                </FormItem>
                <FormItem :label="L('Region')" prop="region">
                    <Input v-model="key.region" :maxlength="32" :minlength="2"></Input>
                </FormItem>
                <FormItem :label="L('UsageTime')" prop="usageTime">
                    <Input v-model="key.usageTime" :maxlength="32" :minlength="2"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="cancel">{{L('Cancel')}}</Button>
                <Button @click="save" type="primary">{{L('OK')}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '../../../lib/util'
    import AbpBase from '../../../lib/abpbase'
    import Key from '@/store/entities/key';
    @Component
    export default class EditKey extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        key:Key=new Key();
        save(){
            (this.$refs.keyForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'key/update',
                        data:this.key
                    });
                    (this.$refs.keyForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        cancel(){
            (this.$refs.keyForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.key=Util.extend(true,{},this.$store.state.key.editKey);
            }
        }
        keyRule={
            userName:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('UserName')),trigger: 'blur'}],
            key:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('Key')),trigger: 'blur'}],
            region:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('Region')),trigger: 'blur'}],
            usageTime:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('UsageTime')),trigger: 'blur'}]
        }
    }
</script>

