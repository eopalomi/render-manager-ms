import { Container } from "../domain/model/container.model";
import { GridContainer } from "../domain/model/grid-container.model";
import { ContainerRepository } from "../domain/repositories/container-repository";

export class CreateContainerUseCase {
    constructor(private containerRepository: ContainerRepository){};

    createContainer = async (containerParams: Container) => {
        const { name, justifyContentValue, gapValue, columns, rows, gridList } = containerParams;
  
        let transformedTogridList: GridContainer[] | null = null;

        if (gridList && gridList.length > 0){
            transformedTogridList = gridList.map((grid, index)=>{
                return new GridContainer({
                    numberOfGrid: index + 1,
                    gridColumn: grid.gridColumn,
                    gridRow: grid.gridRow,
                    FlexDirection: grid.FlexDirection,
                    FlexJustifyContent: grid.FlexJustifyContent,
                    FlexAlignItems: grid.FlexAlignItems,
                    FlexGap: grid.FlexGap
                });
            });
        };

         const container = new Container({
            name,
            justifyContentValue,
            gapValue,
            columns,
            rows,
            gridList: transformedTogridList
         });

        return await this.containerRepository.create(container);
    };


}