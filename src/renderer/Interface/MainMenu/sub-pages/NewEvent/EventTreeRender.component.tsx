import { Box, Button } from '@mui/material';
import { EventNode } from 'renderer/shared/components/events/EventNode.component';
import { Tree } from '@visx/hierarchy';
import { ConnectionType, Scene, SceneConnection } from 'renderer/shared/models/base/Scene.model';
import { Group } from '@visx/group';
import { LinkHorizontal } from '@visx/shape';
import { VisualNovel } from 'renderer/shared/models/base/VisualNovel.model';
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip';
import { HierarchyPointLink } from '@visx/hierarchy/lib/types';
import { Zoom } from '@visx/zoom';
import { localPoint } from '@visx/event';

interface IProps {
    visualNovel: VisualNovel;
    width?: number;
    height?: number;
    margin?: { top: number; right: number; bottom: number; left: number };
    nodeSelected: (scene: Scene) => void;
    nodeAdded: (parent: Scene) => void;
    parentNodeCopied: (parent: Scene) => void;
    nodeRemoved: (scene: Scene, parent: Scene) => void;
    onLinkClicked: (linkData: { source: Scene; target: Scene; connection: SceneConnection }) => void;
}

const whitesmoke = '#f5f5f5';
const lightpurple = '#CBC3E3';
const lightorange = '#FFD580';
export const background = '#272b4d';

const defaultMargin = { top: 10, left: 80, right: 80, bottom: 10 };
const initialTransform = {
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    skewX: 0,
    skewY: 0,
};

export function EventTreeRender({
    visualNovel,
    onLinkClicked,
    nodeSelected,
    nodeAdded,
    parentNodeCopied,
    nodeRemoved,
    width = window.innerWidth - 100,
    height = 300,
    margin = defaultMargin,
}: IProps) {
    const VISXHierarchy = visualNovel?.getVISXHierarchyOfVN();
    const yMax = Math.max(height, VISXHierarchy?.depth * 150) - margin.top - margin.bottom;
    const xMax = Math.max(width, VISXHierarchy?.height * 100) - margin.left - margin.right;

    const { containerBounds, TooltipInPortal } = useTooltipInPortal({ scroll: true, detectBounds: false });
    const { showTooltip, updateTooltip, hideTooltip, tooltipOpen, tooltipData, tooltipLeft = 0, tooltipTop = 0 } = useTooltip();

    const getConnectionInformation = (source: Scene, target: Scene) => {
        return source.sceneConnections.find((connection) => connection.resultingScene === target.id);
    };

    const onSceneLinkMouseOver = (sceneConnection: SceneConnection) => {
        showTooltip({ tooltipData: 'Link Horizontal' });
    };

    const onSceneLinkMouseExit = () => {
        hideTooltip();
    };

    const onSceneLinkClick = (linkData: HierarchyPointLink<Scene>) => {
        const connectionIndex = linkData.source.data.sceneConnections.findIndex((connection) => connection.resultingScene === linkData.target.data.id);

        onLinkClicked({
            source: linkData.source.data,
            target: linkData.target.data,
            connection:
                connectionIndex === -1
                    ? {
                          type: ConnectionType.NORMAL,
                          resultingScene: linkData.target.data.id,
                      }
                    : linkData.source.data.sceneConnections[connectionIndex],
        });
    };

    const onCursorMoveInsideCanvas = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!tooltipOpen) {
            return;
        }

        const containerX = ('clientX' in event ? event.clientX : 0) - containerBounds.left;
        const containerY = ('clientY' in event ? event.clientY : 0) - containerBounds.top;
        updateTooltip({
            tooltipOpen,
            tooltipLeft: containerX,
            tooltipTop: containerY,
            tooltipData,
        });
    };

    if (VISXHierarchy) {
        return (
            <Box onPointerMove={onCursorMoveInsideCanvas}>
                <Zoom<SVGSVGElement> width={width} height={height} scaleXMin={1 / 32} scaleXMax={4} scaleYMin={1 / 32} scaleYMax={4} initialTransformMatrix={initialTransform}>
                    {(zoom) => (
                        <Box style={{ position: 'relative' }}>
                            <svg
                                className="new-event__flow"
                                width={width}
                                height={height}
                                ref={zoom.containerRef}
                                style={{ cursor: zoom.isDragging ? 'grabbing' : 'grab', touchAction: 'none' }}
                            >
                                <rect
                                    width={width}
                                    height={height}
                                    rx={14}
                                    fill={background}
                                    onTouchStart={zoom.dragStart}
                                    onTouchMove={zoom.dragMove}
                                    onTouchEnd={zoom.dragEnd}
                                    onMouseDown={zoom.dragStart}
                                    onMouseMove={zoom.dragMove}
                                    onMouseUp={zoom.dragEnd}
                                    onMouseLeave={() => {
                                        if (zoom.isDragging) zoom.dragEnd();
                                    }}
                                    onDoubleClick={(event) => {
                                        const point = localPoint(event) || { x: 0, y: 0 };
                                        zoom.scale({ scaleX: 1.1, scaleY: 1.1, point });
                                    }}
                                />
                                <Tree<Scene> root={VISXHierarchy} size={[yMax, xMax]} className="event-tree">
                                    {(tree) => (
                                        <Group top={margin.top} left={margin.left} transform={zoom.toString()}>
                                            {tree.links().map((link, i) => {
                                                const linkInfo = getConnectionInformation(link.source.data, link.target.data);

                                                return (
                                                    <LinkHorizontal
                                                        className="event-tree__link"
                                                        key={`link-${i}`}
                                                        data={link}
                                                        stroke={
                                                            linkInfo?.type === ConnectionType.NORMAL || !linkInfo?.type
                                                                ? whitesmoke
                                                                : linkInfo?.type === ConnectionType.HIDDEN_CHECK
                                                                ? lightpurple
                                                                : lightorange
                                                        }
                                                        strokeWidth="5"
                                                        onMouseLeave={onSceneLinkMouseExit}
                                                        onMouseOver={() => onSceneLinkMouseOver(linkInfo)}
                                                        onMouseDown={() => onSceneLinkClick(link)}
                                                        fill="none"
                                                    />
                                                );
                                            })}
                                            {tree.descendants().map((node, i) => (
                                                <EventNode
                                                    key={`node-${i}`}
                                                    node={node}
                                                    onAddNode={nodeAdded}
                                                    onAddNodeAutoCompleted={parentNodeCopied}
                                                    onNodeSelected={nodeSelected}
                                                    onRemoveNode={nodeRemoved}
                                                />
                                            ))}
                                        </Group>
                                    )}
                                </Tree>
                            </svg>

                            <Box className="controls">
                                <Button type="button" className="btn btn-zoom" onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}>
                                    +
                                </Button>
                                <Button type="button" className="btn btn-zoom btn-bottom" onClick={() => zoom.scale({ scaleX: 0.8, scaleY: 0.8 })}>
                                    -
                                </Button>
                                <Button type="button" className="btn btn-lg" onClick={zoom.center}>
                                    Center
                                </Button>
                                <Button type="button" className="btn btn-lg" onClick={zoom.reset}>
                                    Reset
                                </Button>
                                <Button type="button" className="btn btn-lg" onClick={zoom.clear}>
                                    Clear
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Zoom>
                {tooltipOpen && (
                    <TooltipInPortal key={Math.random()} left={tooltipLeft} top={tooltipTop} style={defaultStyles}>
                        {tooltipData}
                    </TooltipInPortal>
                )}
            </Box>
        );
    }

    return null;
}
