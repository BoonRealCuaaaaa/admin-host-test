import {
  addRuleApi,
  deleteRuleApi,
  editRuleApi,
  getRulesWithPaginationApi,
} from "@src/api/rule.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import SuccessToastDescription from "@src/components/shared/toaster/success-toast-description";
import { useToast } from "@src/hooks/use-toast";
import { Toaster } from "@src/components/shared/toaster";
import { useAppStore } from "@src/store";
import { DataTable } from "@src/components/shared/data-table";
// import { columns } from "./constants/columns";
import AddRuleForm from "./components/add-rule-form";
import RuleCard from "./components/rule-card";
import { Rule } from "./types/rule";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "react-router-dom";
import EditRuleModal from "./components/edit-rule-modal";
import DeleteRuleModal from "./components/delete-rule-modal";
import { createDataTableQueryKey } from "@src/utils/data-table";
import Switch from "@src/components/shared/switch";

const RuleTab = () => {
  const queryClient = useQueryClient();
  const [ruleInput, setRuleInput] = useState("");
  const { toast } = useToast();

  const [searchParams] = useSearchParams();

  const assistant = useAppStore((state) => state.workspace);

  const queryKey = ["rules"];
  const dataTableQueryKey = createDataTableQueryKey(queryKey, searchParams);
  
  const { mutate: deleteRuleMutation } = useMutation({
    mutationFn: deleteRuleApi,
    onSuccess: async () => {
      await queryClient.prefetchQuery({
        queryKey: dataTableQueryKey,
      });

      toast({
        variant: "success",
        description: (
          <SuccessToastDescription content="Delete rule successfully" />
        ),
      });
    },
  });
  const { mutate: createRule } = useMutation({
    mutationFn: addRuleApi,
    onSuccess: async () => {
      await queryClient.prefetchQuery({
        queryKey: dataTableQueryKey,
      });

      setRuleInput("");
      toast({
        variant: "success",
        description: (
          <SuccessToastDescription content="Create a new rule successfully" />
        ),
      });
    },
  });

  const { mutate: editRuleMutation } = useMutation({
    mutationFn: editRuleApi,
    onSuccess: (response) => {
      toast({
        variant: "success",
        description: (
          <SuccessToastDescription content="Edit rule successfully" />
        ),
      });
      const updatedRule = response.data;
      queryClient.setQueryData(
        dataTableQueryKey,
        (oldData: { items: Rule[]; total: number }) => {
          return {
            ...oldData,
            items: oldData.items.map((rule) =>
              rule.id === updatedRule.id ? updatedRule : rule
            ),
          };
        }
      );
    },
  });

  const onAddRule = () => {
    const rule = ruleInput;
    createRule({ data: { content: rule }, assistantId: assistant.id });
  };

  const toggleRuleEnable = (id, isEnable) => {
    editRuleMutation({
      id: id,
      data: { isEnable: isEnable },
    });
  };

  const columns: ColumnDef<Rule>[] = [
    {
      accessorKey: "content",
      header: ({ column }) => (
        <div
          className="hover:cursor-pointer text-[13px]"
          onClick={() => column.toggleSorting()}
        >
          Content
        </div>
      ),
      cell: ({ row }) => (
        <div className="line-clamp-2 text-sm">
          {row.getValue("content")} 
        </div>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => (
        <button className="text-[13px]" onClick={() => column.toggleSorting()}>
          Last modified
        </button>
      ),
      cell: ({ row }) => (
        <div className="text-left">
          {new Date(row.getValue("updatedAt")).toLocaleDateString()}
        </div>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "isEnable",
      header: ({ column }) => (
        <button className="text-[13px]" onClick={() => column.toggleSorting()}>
          Enable
        </button>
      ),
      enableSorting: true,
      cell: ({ row }) => (
        <Switch checked={row.original.isEnable} aria-disabled={true} onCheckedChange={() =>
          toggleRuleEnable(row.original.id, !row.getValue("isEnable"))
        }/>
      ),
    },
    {
      id: "action",
      header: () => <div className="text-[13px]">Actions</div>,
      cell: ({ row }) => {
        return (
          <div className="flex flex-row">
            <EditRuleModal
              afterSave={(newContent: string) => {
                editRuleMutation({
                  id: row.original.id,
                  data: { content: newContent },
                });
              }}
              content={row.getValue("content")}
            />
            <DeleteRuleModal
              ruleId={row.original.id}
              content={row.getValue("content")}
              afterDelete={(ruleId: string) => deleteRuleMutation(ruleId)}
            />
          </div>
        );
      },
    },
  ];

  const fetchRules = async (searchParams: URLSearchParams) => {
    const { data } = await getRulesWithPaginationApi(
      assistant.id,
      searchParams
    );
    return { items: data?.items || [], total: data?.total || 0 };
  };

  return (
    <>
      <div className="flex flex-row space-x-9 mb-8">
        {/* Add new rule */}
        <AddRuleForm
          onAddRule={onAddRule}
          ruleInput={ruleInput}
          setRuleInput={setRuleInput}
        />
        <RuleCard />
      </div>
      <DataTable
        columns={columns}
        columnWidths={{
          content: "67%",
          updatedAt: "18%",
          isEnable: "8%",
          action: "7%",
        }}
        queryKey={dataTableQueryKey}
        fetchData={fetchRules}
        title={({ rowCount, total }) => `Showing ${rowCount} of ${total} rules`}
        pageSize={3}
        searchPlaceholder="Search rules"
        queryParameterMapping={{
          offset: "offset",
          limit: "limit",
          query: "query",
          order: "order",
        }}
      />
      <Toaster />
    </>
  );
};

export default RuleTab;
