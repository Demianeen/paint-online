import { PaintCanvas } from "@/entities/PaintCanvas";
import { PaintSettingsBar } from "@/features/PaintSettingsBar";
import { PaintToolbar } from "@/features/PaintToolbar";
import { Page } from "@/widgets/Page";

export interface PaintOnlinePageProps {}

export const PaintOnlinePage = ({}: PaintOnlinePageProps) => {
  return (
    <Page>
      <PaintToolbar />
      <PaintCanvas />
    </Page>
  );
};
