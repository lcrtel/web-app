import { Flex, Legend, Text, getIsBaseColor } from "@tremor/react";
import React, { useEffect, useRef, useState } from "react";
import {
    NameType,
    Payload,
} from "recharts/types/component/DefaultTooltipContent";
import { extendTailwindMerge } from "tailwind-merge";



export type CurveType = "linear" | "natural" | "monotone" | "step";

export interface BaseAnimationTimingProps {
    animationDuration?: number;
    showAnimation?: boolean;
}

export interface ChartTooltipProps {
    active: boolean | undefined;
    payload: any;
    label: string;
    categoryColors: Map<string, Color | string>;
    valueFormatter: ValueFormatter;
}

export interface ChartTooltipRowProps {
    value: string;
    name: string;
    color: Color | string;
}

export interface NoDataProps {
    noDataText?: string;
}

export interface ColorClassNames {
    bgColor: string;
    hoverBgColor: string;
    selectBgColor: string;
    textColor: string;
    selectTextColor: string;
    hoverTextColor: string;
    borderColor: string;
    selectBorderColor: string;
    hoverBorderColor: string;
    ringColor: string;
    strokeColor: string;
    fillColor: string;
}

export interface AreaChartProps extends BaseChartProps {
    stack?: boolean;
    curveType?: CurveType;
    connectNulls?: boolean;
    showGradient?: boolean;
}

export interface LegendProps extends React.OlHTMLAttributes<HTMLOListElement> {
    categories: string[];
    colors?: (Color | string)[];
    onClickLegendItem?: (category: string, color: Color | string) => void;
    activeLegend?: string;
    enableLegendSlider?: boolean;
}

export interface ActiveDot {
    index?: number;
    dataKey?: string;
}
export type CustomTooltipProps = {
    payload:
        | Payload<string | number | (string | number)[], string | number>[]
        | undefined;
    active: boolean | undefined;
    label: NameType | undefined;
};

type FixedProps = {
    eventType: "dot" | "category" | "bar" | "slice" | "bubble";
    categoryClicked: string;
};

type BaseEventProps = FixedProps & {
    [key: string]: number | string;
};

export type EventProps = BaseEventProps | null | undefined;

export interface BaseChartProps
    extends BaseAnimationTimingProps,
        React.HTMLAttributes<HTMLDivElement> {
    data: any[];
    categories: string[];
    index: string;
    colors?: (Color | string)[];
    valueFormatter?: ValueFormatter;
    startEndOnly?: boolean;
    showXAxis?: boolean;
    showYAxis?: boolean;
    yAxisWidth?: number;
    intervalType?: IntervalType;
    showTooltip?: boolean;
    showLegend?: boolean;
    showGridLines?: boolean;
    autoMinValue?: boolean;
    minValue?: number;
    maxValue?: number;
    allowDecimals?: boolean;
    noDataText?: string;
    onValueChange?: (value: EventProps) => void;
    enableLegendSlider?: boolean;
    customTooltip?: React.ComponentType<CustomTooltipProps>;
    rotateLabelX?: {
        angle: number;
        verticalShift?: number;
        xAxisHeight?: number;
    };
    tickGap?: number;
}

export type ValueFormatter = {
    (value: number): string;
};

export type IntervalType = "preserveStartEnd" | Interval;

export type Color = (typeof colorValues)[number];


export type CustomTooltipType = {
    payload:
        | Payload<string | number | (string | number)[], string | number>[]
        | undefined;
    active: boolean | undefined;
    label: NameType | undefined;
};

export interface BaseChartProps
    extends BaseAnimationTimingProps,
        React.HTMLAttributes<HTMLDivElement> {
    data: any[];
    categories: string[];
    index: string;
    colors?: (Color | string)[];
    valueFormatter?: ValueFormatter;
    startEndOnly?: boolean;
    showXAxis?: boolean;
    showYAxis?: boolean;
    yAxisWidth?: number;
    intervalType?: IntervalType;
    showTooltip?: boolean;
    showLegend?: boolean;
    showGridLines?: boolean;
    autoMinValue?: boolean;
    minValue?: number;
    maxValue?: number;
    allowDecimals?: boolean;
    noDataText?: string;
    onValueChange?: (value: EventProps) => void;
    enableLegendSlider?: boolean;
    customTooltip?: React.ComponentType<CustomTooltipType>;
    rotateLabelX?: {
        angle: number;
        verticalShift?: number;
        xAxisHeight?: number;
    };
    tickGap?: number;
}

export const useOnWindowResize = (
    handler: { (): void },
    initialWindowSize?: number
) => {
    const [windowSize, setWindowSize] = useState<undefined | number>(
        initialWindowSize
    );
    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
            handler();
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [handler, windowSize]);
};

export const ChartLegend = (
    { payload }: any,
    categoryColors: Map<string, Color | string>,
    setLegendHeight: React.Dispatch<React.SetStateAction<number>>,
    activeLegend: string | undefined,
    onClick?: (category: string, color: Color | string) => void,
    enableLegendSlider?: boolean
) => {
    const legendRef = useRef<HTMLDivElement>(null);

    useOnWindowResize(() => {
        const calculateHeight = (height: number | undefined) =>
            height
                ? Number(height) + 20 // 20px extra padding
                : 60; // default height
        setLegendHeight(calculateHeight(legendRef.current?.clientHeight));
    });

    const filteredPayload = payload.filter((item: any) => item.type !== "none");

    return (
        <div ref={legendRef} className="flex items-center justify-end">
            <Legend
                categories={filteredPayload.map((entry: any) => entry.value)}
                colors={filteredPayload.map((entry: any) =>
                    categoryColors.get(entry.value)
                )}
                onClickLegendItem={onClick}
                activeLegend={activeLegend}
                enableLegendSlider={enableLegendSlider}
            />
        </div>
    );
};

export function deepEqual(obj1: any, obj2: any) {
    if (obj1 === obj2) return true;

    if (
        typeof obj1 !== "object" ||
        typeof obj2 !== "object" ||
        obj1 === null ||
        obj2 === null
    )
        return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key]))
            return false;
    }

    return true;
}

export const ChartTooltipFrame = ({
    children,
}: {
    children: React.ReactNode;
}) => (
    <div
        className={tremorTwMerge(
            // common
            "rounded-tremor-default text-tremor-default border",
            // light
            "bg-tremor-background shadow-tremor-dropdown border-tremor-border",
            // dark
            "dark:bg-dark-tremor-background dark:shadow-dark-tremor-dropdown dark:border-dark-tremor-border"
        )}
    >
        {children}
    </div>
);

export const ChartTooltipRow = ({
    value,
    name,
    color,
}: ChartTooltipRowProps) => (
    <div className="flex items-center justify-between space-x-8">
        <div className="flex items-center space-x-2">
            <span
                className={tremorTwMerge(
                    // common
                    "shrink-0 rounded-tremor-full border-2 h-3 w-3",
                    // light
                    "border-tremor-background shadow-tremor-card",
                    // dark
                    "dark:border-dark-tremor-background dark:shadow-dark-tremor-card",
                    getColorClassNames(color, colorPalette.background).bgColor
                )}
            />
            <p
                className={tremorTwMerge(
                    // commmon
                    "text-right whitespace-nowrap",
                    // light
                    "text-tremor-content",
                    // dark
                    "dark:text-dark-tremor-content"
                )}
            >
                {name}
            </p>
        </div>
        <p
            className={tremorTwMerge(
                // common
                "font-medium tabular-nums text-right whitespace-nowrap",
                // light
                "text-tremor-content-emphasis",
                // dark
                "dark:text-dark-tremor-content-emphasis"
            )}
        >
            {value}
        </p>
    </div>
);

export const ChartTooltip = ({
    active,
    payload,
    label,
    categoryColors,
    valueFormatter,
}: ChartTooltipProps) => {
    if (active && payload) {
        const filteredPayload = payload.filter(
            (item: any) => item.type !== "none"
        );

        return (
            <ChartTooltipFrame>
                <div
                    className={tremorTwMerge(
                        // light
                        "border-tremor-border border-b px-4 py-2",
                        // dark
                        "dark:border-dark-tremor-border"
                    )}
                >
                    <p
                        className={tremorTwMerge(
                            // common
                            "font-medium",
                            // light
                            "text-tremor-content-emphasis",
                            // dark
                            "dark:text-dark-tremor-content-emphasis"
                        )}
                    >
                        {label}
                    </p>
                </div>

                <div className={tremorTwMerge("px-4 py-2 space-y-1")}>
                    {filteredPayload.map(
                        (
                            { value, name }: { value: number; name: string },
                            idx: number
                        ) => (
                            <ChartTooltipRow
                                key={`id-${idx}`}
                                value={valueFormatter(value)}
                                name={name}
                                color={
                                    categoryColors.get(name) ?? BaseColors.Blue
                                }
                            />
                        )
                    )}
                </div>
            </ChartTooltipFrame>
        );
    }
    return null;
};

export const NoData = ({ noDataText = "No data" }: NoDataProps) => {
    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            className={tremorTwMerge(
                // common
                "w-full h-full border border-dashed rounded-tremor-default",
                // light
                "border-tremor-border",
                // dark
                "dark:border-dark-tremor-border"
            )}
        >
            <Text
                className={tremorTwMerge(
                    // light
                    "text-tremor-content",
                    // dark
                    "dark:text-dark-tremor-content"
                )}
            >
                {noDataText}
            </Text>
        </Flex>
    );
};

export const constructCategoryColors = (
    categories: string[],
    colors: (Color | string)[]
): Map<string, Color | string> => {
    const categoryColors = new Map<string, Color | string>();
    categories.forEach((category, idx) => {
        categoryColors.set(category, colors[idx]);
    });
    return categoryColors;
};

export const getYAxisDomain = (
    autoMinValue: boolean,
    minValue: number | undefined,
    maxValue: number | undefined
) => {
    const minDomain = autoMinValue ? "auto" : minValue ?? 0;
    const maxDomain = maxValue ?? "auto";
    return [minDomain, maxDomain];
};

export function hasOnlyOneValueForThisKey(array: any[], keyToCheck: string) {
    const val = [];

    for (const obj of array) {
        if (Object.prototype.hasOwnProperty.call(obj, keyToCheck)) {
            val.push(obj[keyToCheck]);
            if (val.length > 1) {
                return false;
            }
        }
    }

    return true;
}

export const BaseColors: { [key: string]: Color } = {
    Slate: "slate",
    Gray: "gray",
    Zinc: "zinc",
    Neutral: "neutral",
    Stone: "stone",
    Red: "red",
    Orange: "orange",
    Amber: "amber",
    Yellow: "yellow",
    Lime: "lime",
    Green: "green",
    Emerald: "emerald",
    Teal: "teal",
    Cyan: "cyan",
    Sky: "sky",
    Blue: "blue",
    Indigo: "indigo",
    Violet: "violet",
    Purple: "purple",
    Fuchsia: "fuchsia",
    Pink: "pink",
    Rose: "rose",
};

export const colorPalette = {
    canvasBackground: 50,
    lightBackground: 100,
    background: 500,
    darkBackground: 600,
    darkestBackground: 800,
    lightBorder: 200,
    border: 500,
    darkBorder: 700,
    lightRing: 200,
    ring: 300,
    lightText: 400,
    text: 500,
    darkText: 700,
    darkestText: 900,
    icon: 500,
};

export const getIsArbitraryColor = (color: Color | string) =>
    color.includes("#") || color.includes("--") || color.includes("rgb");

export const defaultValueFormatter: ValueFormatter = (value: number) =>
    value.toString();

export function getColorClassNames(
    color: Color | string,
    shade?: number
): ColorClassNames {
    const isBaseColor = getIsBaseColor(color);
    if (
        color === "white" ||
        color === "black" ||
        color === "transparent" ||
        !shade ||
        !isBaseColor
    ) {
        const unshadedColor = !getIsArbitraryColor(color)
            ? color
            : `[${color}]`;
        return {
            bgColor: `bg-${unshadedColor}`,
            hoverBgColor: `hover:bg-${unshadedColor}`,
            selectBgColor: `ui-selected:bg-${unshadedColor}`,
            textColor: `text-${unshadedColor}`,
            selectTextColor: `ui-selected:text-${unshadedColor}`,
            hoverTextColor: `hover:text-${unshadedColor}`,
            borderColor: `border-${unshadedColor}`,
            selectBorderColor: `ui-selected:border-${unshadedColor}`,
            hoverBorderColor: `hover:border-${unshadedColor}`,
            ringColor: `ring-${unshadedColor}`,
            strokeColor: `stroke-${unshadedColor}`,
            fillColor: `fill-${unshadedColor}`,
        };
    }
    return {
        bgColor: `bg-${color}-${shade}`,
        selectBgColor: `ui-selected:bg-${color}-${shade}`,
        hoverBgColor: `hover:bg-${color}-${shade}`,
        textColor: `text-${color}-${shade}`,
        selectTextColor: `ui-selected:text-${color}-${shade}`,
        hoverTextColor: `hover:text-${color}-${shade}`,
        borderColor: `border-${color}-${shade}`,
        selectBorderColor: `ui-selected:border-${color}-${shade}`,
        hoverBorderColor: `hover:border-${color}-${shade}`,
        ringColor: `ring-${color}-${shade}`,
        strokeColor: `stroke-${color}-${shade}`,
        fillColor: `fill-${color}-${shade}`,
    };
}

export const themeColorRange: Color[] = [
    BaseColors.Blue,
    BaseColors.Cyan,
    BaseColors.Sky,
    BaseColors.Indigo,
    BaseColors.Violet,
    BaseColors.Purple,
    BaseColors.Fuchsia,
    BaseColors.Slate,
    BaseColors.Gray,
    BaseColors.Zinc,
    BaseColors.Neutral,
    BaseColors.Stone,
    BaseColors.Red,
    BaseColors.Orange,
    BaseColors.Amber,
    BaseColors.Yellow,
    BaseColors.Lime,
    BaseColors.Green,
    BaseColors.Emerald,
    BaseColors.Teal,
    BaseColors.Pink,
    BaseColors.Rose,
];

export const tremorTwMerge = extendTailwindMerge({
    extend: {
        classGroups: {
            shadow: [
                {
                    tremor: ["input", "card", "dropdown"],
                    "dark-tremor": ["input", "card", "dropdown"],
                },
            ],
            rounded: [
                {
                    tremor: ["small", "default", "full"],
                    "dark-tremor": ["small", "default", "full"],
                },
            ],
            "text-color": [
                {
                    tremor: ["default", "title", "metric"],
                    "dark-tremor": ["default", "title", "metric"],
                },
            ],
        },
    },
});

export const colorValues = [
    "slate",
    "gray",
    "zinc",
    "neutral",
    "stone",
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
] as const;

export interface DonutChartTooltipProps {
    active: boolean | undefined;
    payload: any;
    valueFormatter: ValueFormatter;
}

export const DonutChartTooltip = ({
    active,
    payload,
    valueFormatter,
}: DonutChartTooltipProps) => {
    if (active && payload?.[0]) {
        const payloadRow = payload?.[0];
        return (
            <ChartTooltipFrame>
                <div className={tremorTwMerge("px-4 py-2")}>
                    <ChartTooltipRow
                        value={valueFormatter(payloadRow.value)}
                        name={payloadRow.name}
                        color={payloadRow.payload.color}
                    />
                </div>
            </ChartTooltipFrame>
        );
    }
    return null;
};

export const parseData = (data: any[], colors: (Color | string)[]) =>
    data.map((dataPoint: any, idx: number) => {
        const baseColor = idx < colors.length ? colors[idx] : BaseColors.Gray;
        return {
            ...dataPoint,
            // explicitly adding color key if not present for tooltip coloring
            color: baseColor,
            className: getColorClassNames(
                baseColor ?? BaseColors.Gray,
                colorPalette.background
            ).fillColor,
            fill: "",
        };
    });

const calculateDefaultLabel = (data: any[], category: string) =>
    sumNumericArray(data.map((dataPoint) => dataPoint[category]));

export const parseLabelInput = (
    labelInput: string | undefined,
    valueFormatter: ValueFormatter,
    data: any[],
    category: string
) =>
    labelInput
        ? labelInput
        : valueFormatter(calculateDefaultLabel(data, category));

export const sumNumericArray = (arr: number[]) =>
    arr.reduce((prefixSum, num) => prefixSum + num, 0);
