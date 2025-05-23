import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type UsageT = {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
};

export type ModelT = "gpt-4.1-nano" | "gpt-4o-mini" | "gpt-4.1-mini";

const modelPricing: Record<ModelT, { prompt: number; completion: number }> = {
  "gpt-4.1-nano": { prompt: 0.1, completion: 0.4 },
  "gpt-4o-mini": { prompt: 0.15, completion: 0.6 },
  "gpt-4.1-mini": { prompt: 0.4, completion: 1.6 },
};

const TokenCostTable = ({ model, usage }: { model: ModelT; usage: UsageT | null }) => {
  const promptTokens = usage?.promptTokens ?? 0;
  const completionTokens = usage?.completionTokens ?? 0;
  const totalTokens = usage?.totalTokens ?? 0;

  const prices = modelPricing[model];
  const promptAmount = (promptTokens * prices.prompt) / 1_000_000;
  const completionAmount = (completionTokens * prices.completion) / 1_000_000;
  const totalAmount = promptAmount + completionAmount;

  return (
    <Table>
      <TableCaption>Token usage and cost for model: {model}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Tokens</TableHead>
          <TableHead>Price per 1M Token ($)</TableHead>
          <TableHead>Amount ($)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Prompt Tokens</TableCell>
          <TableCell>{promptTokens}</TableCell>
          <TableCell>{prices.prompt.toFixed(2)}</TableCell>
          <TableCell>{promptAmount.toFixed(6)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Completion Tokens</TableCell>
          <TableCell>{completionTokens}</TableCell>
          <TableCell>{prices.completion.toFixed(2)}</TableCell>
          <TableCell>{completionAmount.toFixed(6)}</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow className="font-semibold">
          <TableCell>Total Tokens</TableCell>
          <TableCell>{totalTokens}</TableCell>
          <TableCell>-</TableCell>
          <TableCell>{totalAmount.toFixed(6)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default TokenCostTable;
