export function SupplyChainStatus() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium">Supplier A</p>
          <p className="text-sm text-muted-foreground">
            On-time, Expected delivery: 2 days
          </p>
        </div>
        <div className="flex h-2 w-2 rounded-full bg-green-500" />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium">Supplier B</p>
          <p className="text-sm text-muted-foreground">
            Delayed, Expected delivery: 5 days
          </p>
        </div>
        <div className="flex h-2 w-2 rounded-full bg-yellow-500" />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium">Supplier C</p>
          <p className="text-sm text-muted-foreground">
            On-time, Expected delivery: 1 day
          </p>
        </div>
        <div className="flex h-2 w-2 rounded-full bg-green-500" />
      </div>
    </div>
  );
}
