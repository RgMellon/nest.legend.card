-- AddForeignKey
ALTER TABLE "rates" ADD CONSTRAINT "rates_stage_id_fkey" FOREIGN KEY ("stage_id") REFERENCES "stages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
