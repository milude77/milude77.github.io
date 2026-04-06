---
title: 二分算法详解
icon: code
---

# 二分算法详解

二分算法（Binary Search）是一种在有序数组中查找特定元素的经典算法。它通过不断将搜索区间减半来快速定位目标元素，具有极高的查找效率。

## 算法原理

二分算法的核心思想是将有序数组分成两半，通过比较中间元素与目标值的大小关系，决定在哪一半继续搜索。

### 基本步骤

1. 初始化边界：`left = 0`, `right = len(arr) - 1`
2. 计算中间位置：`mid = (left + right) // 2`
3. 比较判断：
   - `arr[mid] == target`：找到目标
   - `arr[mid] > target`：向左查找
   - `arr[mid] < target`：向右查找
4. 重复以上步骤，直到找到目标或 `left > right`

## Python 代码实现

### 递归实现

```python
def binary_search_recursive(arr, target, left=0, right=None):
    if right is None:
        right = len(arr) - 1

    if left > right:
        return -1

    mid = (left + right) // 2

    if arr[mid] == target:
        return mid
    elif arr[mid] > target:
        return binary_search_recursive(arr, target, left, mid - 1)
    else:
        return binary_search_recursive(arr, target, mid + 1, right)
```

### 迭代实现

```python
def binary_search_iterative(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] > target:
            right = mid - 1
        else:
            left = mid + 1

    return -1
```

## 应用示例

```python
arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
target = 11

index = binary_search_iterative(arr, target)
print(f"目标值 {target} 在数组中的索引为: {index}")
```

## 复杂度分析

- 时间复杂度：`O(log n)`
- 空间复杂度：迭代实现 `O(1)`，递归实现 `O(log n)`

## 小结

二分算法适用于有序数组查找场景，拥有极高查询效率。对大规模数据检索和索引系统非常友好。